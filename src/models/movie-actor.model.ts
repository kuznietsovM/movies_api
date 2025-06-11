import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/sqlite.db";

class MovieActor extends Model<InferAttributes<MovieActor>, InferCreationAttributes<MovieActor>> {
  declare movieId: number;
  declare actorId: number;
}

MovieActor.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'movies',
        key: 'id'
      }
    },
    actorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'actors',
        key: 'id'
      }
    },
  },
  {
    sequelize: db,
    timestamps: false,
    modelName: 'movie_actor'
  } 
)

export default MovieActor;