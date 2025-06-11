import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/sqlite.db";

class Actor extends Model<InferAttributes<Actor>, InferCreationAttributes<Actor>> {
  declare id: CreationOptional<number>
  declare name: string
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
} 

Actor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: db,
    timestamps: true,
    modelName: 'actor',
    indexes: [
      {
        fields: ['name']
      }
    ]
  } 
)

export default Actor