import TurnosDisponibles from "../models/turnosDisponibles.js";
import { getUserByUsername2 } from "./user.js";

export const getAllTurnosDisponibles = async (req, res) => {
  const turnosDisponibles = await TurnosDisponibles.findAll();
  res.status(200).json({ turnosDisponibles });
};

export const getTurnoDisponibleById = async (req, res) => {
  const turno = await TurnosDisponibles.findByPk(req.params.turnoId);
  res.status(200).json({ turno });
};

export const getTurnosDisponiblesbyUsername = async (req, res) => {
  console.log(
    "Estoy entrando en obtener turnos disponibles de: ",
    req.params.username
  );
  try {
    const turnos = await TurnosDisponibles.findAll({
      where: {
        username: req.params.username,
      },
    });
    res.status(200).json({ turnos });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createTurnoDisponible = async (req, res) => {
  try {
    const { dia, horario, username } = req.body;

    const user = await getUserByUsername2(username);
    if (!user) {
      return res.status(500).json({ message: "Usuario no encontrado" });
    }

    const existingTurno = await TurnosDisponibles.findOne({
      where: { dia, horario, username },
    });

    if (existingTurno) {
      return res.status(400).json({
        message:
          "El usuario ya tiene un turno disponible en ese día y horario.",
      });
    }

    const turnoDisponible = await TurnosDisponibles.create(req.body);
    res.status(200).json({ turnoDisponible });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear el turno disponible", error: err });
  }
};

export const deleteTurnoDisponible = async (req, res) => {
  try {
    const turno = await TurnosDisponibles.findByPk(req.params.turnoId);
    try {
      const destroy = TurnosDisponibles.destroy({
        where: {
          id: req.params.turnoId,
        },
      });
    } catch (err) {
      res.status(500).json({ err });
    }
    res.status(200).json({ turno });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const updateTurnoDisponible = async (req, res) => {
  try {
    const turno = await TurnosDisponibles.update(req.body, {
      where: {
        id: req.params.turnoId,
      },
    });
    res.status(200).json({ turno });
  } catch (err) {
    res.status(500).json({ err });
  }
};
