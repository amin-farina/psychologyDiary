import db from "../db.js";
import { DataTypes } from "sequelize";
import User from "./user.js";

const Cliente = db.define(
  "Cliente",
  {
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    nombreProfesional: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Cliente;
