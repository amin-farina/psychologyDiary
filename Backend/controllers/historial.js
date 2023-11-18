import HistorialTurnos from "../models/historial.js";

export const getAllHistorial = async (req, res) => {
  const historial = await HistorialTurnos.findAll();
  res.status(200).json({ historial });
};

export const getHistorialByIdCliente = async (req, res) => {
  try {
    const historial = await HistorialTurnos.findAll({
      where: { clienteId: req.params.idCliente },
    });
    res.status(200).json({ historial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getHistorialByDate = async (req, res) => {
  try {
    const historial = await HistorialTurnos.findAll({
      where: { fechaHistorial: req.params.fechaHistorial },
    });
    res.status(200).json({ historial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
