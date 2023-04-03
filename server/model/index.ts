import dbConfig from "../config/db-config";
import { Sequelize, DataTypes } from "sequelize";
import file from "./File";

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT as any,
  }
);

const db: any = {};

db.sequelize = sequelize;
db.models = {};
db.models.File = file(sequelize, DataTypes);

export default db;
