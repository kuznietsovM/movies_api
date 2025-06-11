import { CreationOptional, DataTypes, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import db from "../db/sqlite.db";
import Actor from "./actor.model";

export enum MovieFormat {
  VHS = 'VHS', 
  DVD = 'DVD', 
  BluRay = 'Blu-ray'
}

class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
  declare id: CreationOptional<number>
  declare title: string
  declare year: number
  declare format: MovieFormat

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare actors?: NonAttribute<Actor[]>

  declare setActors: HasManySetAssociationsMixin<Actor, number>;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    year: {
      type: DataTypes.SMALLINT
    },
    format: {
      type: DataTypes.ENUM,
      values: Object.values(MovieFormat)
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: db,
    timestamps: true,
    modelName: 'movie',
    indexes: [
      {
        fields: ['title']
      }
    ]
  } 
)

export default Movie