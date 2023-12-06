import Cliente from "../models/clientes.js";
import { getUserByUsername2 } from "./user.js";

export const getAllClientes = async (req, res) => {
  const clientes = await Cliente.findAll();
  res.status(200).json({ clientes });
};

export const getClienteById = async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.dni);
  res.status(200).json({ cliente });
};

export const getClienteByUser = async (req, res) => {
  const clientes = await Cliente.findAll({
    where: {
      username: req.params.username
    }
  });
  res.status(200).json({ clientes });
};

export const createCliente = async (req, res) => {
  try {
    const { dni, name, lastName, email, telefono } = req.body;
    const username = req.body.username;

    try {
      const responseUser = await getUserByUsername2(username);
      if (responseUser === null) {
        res.status(404).json({ message: "Usuario no encontrado." });
        return;
      }
    } catch (err) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    const cliente = await Cliente.create({
      dni,
      name,
      lastName,
      email,
      telefono,
      username,
    });

    res.status(200).json({ message: "Cliente creado con éxito.", cliente });
  } catch (err) {
    console.error("Error al crear el cliente:", err);
    res.status(500).json({
      message:
        "Error interno del servidor. Por favor, inténtalo de nuevo más tarde.",
    });
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
        dni: req.params.clienteId,
      },
    });
    res.status(200).json({ cliente });
  } catch (err) {
    res.status(500).json({ err });
  }
};
