import { DataTypes } from "sequelize";
import db from "../db.js";

const HistorialTurnos = db.define(
  "HistorialTurnos",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    turnoId: {
      type: DataTypes.INTEGER,
    },
    clienteId: {
      type: DataTypes.INTEGER,
    },
    fechaHistorial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreCliente: {
      type: DataTypes.STRING,
    },
    statusTurn: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default HistorialTurnos;
