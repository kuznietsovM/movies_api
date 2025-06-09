import { Sequelize } from "sequelize";
import config from "../config/config";

const db = new Sequelize({
  dialect: 'sqlite',
  port: config.db.port,
  storage: './data'
})

export default db;