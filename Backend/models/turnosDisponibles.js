import { DataTypes } from "sequelize";
import db from "../db.js";

const TurnosDisponibles = db.define(
  "TurnosDisponibles",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    dia: {
      type: DataTypes.STRING,
    },
    horario: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default TurnosDisponibles;
