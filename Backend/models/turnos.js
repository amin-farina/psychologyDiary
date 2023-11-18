import db from "../db.js";
import { DataTypes } from "sequelize";
import Cliente from "./clientes.js";

const Turnos = db.define(
  "Turno",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreCliente: {
      type: DataTypes.STRING,
    },
    telefonoCliente: {
      type: DataTypes.INTEGER,
    },
    emailCliente: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Turnos.belongsTo(Cliente);

export default Turnos;
