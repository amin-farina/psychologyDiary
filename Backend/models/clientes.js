import db from "../db.js";
import { DataTypes } from "sequelize";

const Cliente = db.define(
  "Cliente",
  {
    dni: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    timestamps: false,
  }
);

export default Cliente;
