import { NextFunction, Request, Response } from "express";
import { CreateMovie } from "../schemas/create-movie.schema";
import movieService from "../services/movie.service";
import { UpdateMovie } from "../schemas/update-movie.schema";
import { FindMovieParamsSchema } from "../schemas/find-movie-params.schema";

class MovieController {
  async create (req: Request<{}, {}, CreateMovie>, res: Response, next: NextFunction) {
    const movieData = req.body
    
    try{
      const movie = await movieService.create(movieData);

      res.status(200).json({data: movie, status: 1});
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try{
      await movieService.delete(id)
      res.status(200).json({status: 1})
    } catch (e) {
      next(e)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try{
      const movie = await movieService.get(id)
      res.status(200).json({data: movie, status: 1})
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request<{ id: string }, {}, UpdateMovie>, res: Response, next: NextFunction) {
    const updateData = req.body
    const { id } = req.params

    try {
      const movie = await movieService.update(id, updateData)

      res.status(200).json({data: movie, status: 1})
    } catch (e) {
      next(e)
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const query = FindMovieParamsSchema.parse(req.query);
      const result = await movieService.find(query)
      
      res.status(200).json({
        data: result.rows,
        meta: {
          total: result.count
        }, 
        status: 1
      })
    } catch (e) {
      next(e)
    }
  }
}

export default new MovieController();