import dbConfig from "../config/db-config";
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT as any,
  }
);
