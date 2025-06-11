import { Includeable, WhereOptions } from "sequelize";
import db from "../db/sqlite.db";
import { Actor, Movie } from "../models";
import { CreateMovie } from "../schemas/create-movie.schema";
import { FindMovieParams } from "../schemas/find-movie-params.schema";
import { UpdateMovie } from "../schemas/update-movie.schema";
import actorService from "./actor.service";
import { Op } from "sequelize";
import { MovieExistsError, MovieNotFoundError } from "../utils/errors";

class MovieService {

  async create (data: CreateMovie) {

    const movie = await this.getByTitle(data.title)
    if(movie)
      throw new MovieExistsError('title', data.title)

    const include : Includeable[] = []

    if(data.actors){
      include.push({model: Actor})
    }
    const transformedData = {
      ...data,
      actors: data.actors ? data.actors.map(actor => ({name: actor})) : undefined
    }

    return await Movie.create(transformedData, { include })
  }

  async delete (id: number) {
    const deletedNumber = await Movie.destroy({
      where: { id }
    })

    if(deletedNumber < 1)
      throw new MovieNotFoundError(id)
  }

  async get (id: number) {
    const movie = await Movie.findByPk(id, {
      include: [{ 
        model: Actor, 
        through: {
          attributes: []
        }
      }]
    })

    if(!movie)
      throw new MovieNotFoundError(id)

    return movie
  }

  async update (id: number, data: UpdateMovie) {
    const { actors: actorNames, ...movieData } = data

    const transaction = await db.transaction()

    try {
      const movie = await Movie.findByPk(id, {transaction})
      if(!movie)
        throw new MovieNotFoundError(id)

      await Movie.update(movieData, {
        where: { id },
        transaction
      })

      if(actorNames && actorNames.length > 0){
        const actors = await actorService.createMany(actorNames, transaction)
        await movie.setActors(actors, {transaction})
      }

      await transaction.commit()
      return await this.get(id) 
    } catch(e) {
      transaction.rollback()
      console.error("Error during movie update:", e);
      throw e
    }
  }

  async find(params: FindMovieParams) {

    let where: WhereOptions<Movie> = {}
    let include: Includeable[] = []

    if(params.title){
      where = {
        title: { [Op.like]: `%${params.title}%` }
      }
    }

    if(params.actor) {
      include = [{
        model: Actor,
        required: true,
        attributes: [],
        where: {
          name: { [Op.like]: `%${params.actor}%` }
        }
      }]
    }

    //overrides 'actor' and 'title' specific searches
    if(params.search) {
      where = {
        [Op.or]: [
          {
            title: { [Op.like]: `%${params.search}%` }
          },
          db.literal(`EXISTS (
            SELECT 1 FROM "actors" AS "Actor"
            INNER JOIN "movie_actors" AS "MovieActors"
            ON "Actor"."id" = "MovieActors"."actorId"
            WHERE "MovieActors"."movieId" = "Movie"."id"
            AND "Actor"."name" LIKE '%${params.search}%'
          )`)
        ]
      }

      include = [{
        model: Actor,
        required: false,
        attributes: [],
      }]
    }
    

    const result = await Movie.findAndCountAll({
      where,
      order: [[params.sort, params.order]],
      limit: params.limit,
      offset: params.offset,
      include: include
    })

    return result
  }

  private async getByTitle (title: string) {
    return await Movie.findOne({
      where: {
        title
      }
    })
  } 
}

export default new MovieService();