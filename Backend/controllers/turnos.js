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
    const { ClienteId, fecha, statusTurn, hora, dia } = req.body;

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
        hora,
        statusTurn,
        nombreCliente,
        telefonoCliente,
        emailCliente,
        dia,
        disponible: false,
      });

      await HistorialTurnos.create({
        turnoId: turno.id,
        clienteId: ClienteId,
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
      error: "Error interno del servidor,l al intentar crear el turno",
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
