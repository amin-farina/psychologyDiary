import TurnosDisponibles from "../models/turnosDisponibles.js";

export const getAllTurnosDisponibles = async (req, res) => {
  const turnosDisponibles = await TurnosDisponibles.findAll();
  res.status(200).json({ turnosDisponibles });
};

export const getTurnoDisponibleById = async (req, res) => {
  const turno = await TurnosDisponibles.findByPk(req.params.turnoId);
  res.status(200).json({ turno });
};

export const createTurnoDisponible = async (req, res) => {
  try {
    const turnoDisponible = await TurnosDisponibles.create(req.body);
    res.status(200).json({ turnoDisponible });
  } catch (err) {
    res.status(500).json({ err });
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
