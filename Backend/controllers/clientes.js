import Cliente from "../models/clientes.js";

export const getAllClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.status(200).json({ clientes });
};

export const getClienteById = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.clienteId);
  res.status(200).json({ cliente });
};

export const createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(200).json({ cliente });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.clienteId);
    try {
      const destroy = Cliente.destroy({
        where: {
          id: req.params.clienteId,
        },
      });
    } catch (err) {
      res.status(500).json({ err });
    }
    res.status(200).json({ cliente });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.update(req.body, {
      where: {
        id: req.params.clienteId,
      },
    });
    res.status(200).json({ cliente });
  } catch (err) {
    res.status(500).json({ err });
  }
};
