import Turnos from "../models/turnos.js";
import Cliente from "../models/clientes.js";
import HistorialTurnos from "../models/historial.js";
import User from "../models/user.js";
import { Op } from "sequelize";

export const getAllTurnos = async (req, res) => {
  const turno = await Turnos.findAll();
  res.status(200).json({ turno });
};

export const getTurnoById = async (req, res) => {
  const turno = await Turnos.findByPk(req.params.turnoId);
  res.status(200).json({ turno });
};

export const getTurnoByUser = async (req, res) => {
  const turno = await Turnos.findAll({
    where: {
      username: req.params.username,
    },
    order: [
      ["fecha", "DESC"],
      ["hora", "ASC"],
    ],
  });
  res.status(200).json({ turno });
};

export const getSiguientesTurnosByUser = async (req, res) => {
  const fechaHoraActual = new Date();
  console.log("Fecha y hora actual:", fechaHoraActual.toISOString());
  try {
    const turnosFuturos = await Turnos.findAll({
      where: {
        username: req.params.username,
        fecha: {
          [Op.and]: {
            [Op.gte]: fechaHoraActual.toISOString().split("T")[0], // Fecha mayor o igual a hoy
            [Op.or]: {
              [Op.gt]: fechaHoraActual.toISOString().split("T")[1], // Hora mayor a ahora
              [Op.eq]: null, // o nula si no se especifica una hora
            },
          },
        },
      },
      order: [
        ["fecha", "ASC"],
        ["hora", "ASC"],
      ],
    });
    console.log("Turnos futuros:", turnosFuturos);
    res.status(200).json({ turnosFuturos });
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createTurno = async (req, res) => {
  try {
    const { dni, fecha, statusTurn, hora, dia, username } = req.body;

    const horarioDeseado = hora;
    const fechaDeseada = fecha;
    const turnoExistente = await Turnos.findOne({
      where: {
        fecha: fechaDeseada,
        hora: horarioDeseado,
        disponible: false,
      },
    });

    if (turnoExistente) {
      return res.status(400).json({ error: "El turno no esta disponible" });
    } else {
      const clienteExistente = await Cliente.findByPk(dni);
      if (!clienteExistente) {
        return res.status(400).json({ error: "Cliente no encontrado" });
      }
      const userExistente = await User.findOne({
        where: { username: username },
      });
      if (!userExistente) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }
      const nombreCliente =
        clienteExistente.name + " " + clienteExistente.lastName;
      const telefonoCliente = clienteExistente.telefono;
      const emailCliente = clienteExistente.email;
      const turno = await Turnos.create({
        dni: dni,
        fecha,
        hora,
        statusTurn,
        nombreCliente,
        telefonoCliente,
        emailCliente,
        dia,
        disponible: false,
        username,
      });

      await HistorialTurnos.create({
        turnoId: turno.id,
        dni: dni,
        fechaHistorial: fecha,
        nombreCliente: nombreCliente,
        statusTurn: turno.statusTurn,
        hora: turno.hora,
        dia,
        disponible: false,
      });
      res.status(200).json({ turno });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error interno del servidor,al al intentar crear el turno",
      type: { err },
    });
  }
};

export const deleteTurno = async (req, res) => {
  try {
    const turno = await Turnos.destroy({
      where: {
        id: req.params.turnoId,
      },
    });
    res.status(200).json({ turno });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const updateTurno = async (req, res) => {
  try {
    const turno = await Turnos.update(req.body, {
      where: {
        id: req.params.turnoId,
      },
    });
    res.status(200).json({ turno });
  } catch (err) {
    res.status(500).json({ err });
  }
};
