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
    dia: {
      type: DataTypes.STRING,
    },
    hora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombreCliente: {
      type: DataTypes.STRING,
    },
    telefonoCliente: {
      type: DataTypes.STRING,
    },
    emailCliente: {
      type: DataTypes.STRING,
    },
    statusTurn: {
      type: DataTypes.STRING,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Por defecto, todos los turnos están disponibles
    },
    dni: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export default Turnos;
