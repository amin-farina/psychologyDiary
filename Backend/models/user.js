import { DataTypes } from "sequelize";
import db from "../db.js";
import Cliente from "./clientes.js";

const User = db.define(
  "Users",
  {
    username: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM("admin", "usuario"),
    },
    codigo: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);


export default User;
