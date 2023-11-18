import Turnos from "../models/turnos.js";
import Cliente from "../models/clientes.js";
import HistorialTurnos from "../models/historial.js";

export const getAllTurnos = async (req, res) => {
  const turno = await Turnos.findAll();
  res.status(200).json({ turno });
};

export const getTurnoById = async (req, res) => {
  const turno = await Turnos.findByPk(req.params.turnoId);
  res.status(200).json({ turno });
};

export const createTurno = async (req, res) => {
  try {
    const { ClienteId, fecha } = req.body;
    const clienteExistente = await Cliente.findByPk(ClienteId);
    if (!clienteExistente) {
      return res.status(400).json({ error: "Cliente no encontrado" });
    }
    const nombreCliente =
      clienteExistente.name + " " + clienteExistente.lastName;
    const telefonoCliente = clienteExistente.telefono;
    const emailCliente = clienteExistente.email;
    const turno = await Turnos.create({
      ClienteId,
      fecha,
      nombreCliente,
      telefonoCliente,
      emailCliente,
    });

    await HistorialTurnos.create({
      turnoId: turno.id,
      clienteId: ClienteId,
      fechaHistorial: fecha,
      nombreCliente: nombreCliente,
    });
    res.status(200).json({ turno });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
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
