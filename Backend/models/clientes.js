import db from "../db.js";
import { DataTypes } from "sequelize";

const Cliente = db.define("Cliente", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  telefono: DataTypes.INTEGER,
},
{
    timestamps: false
});

export default Cliente;
