import { Sequelize } from "sequelize";
import config from "./config.js";

const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  dialect: config.DB_DIALECT,
});

export default db;
