import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUser = async (req, res) => {
  console.log("Estoy entrando a AllUser");
  const users = await User.findAll();
  res.status(200).json({ users });
};

export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getUserByUsername2 = async (username) => {
  try {
    const user = await User.findOne({
      where: { username },
    });
    return user; // Devuelve el usuario encontrado
  } catch (err) {
    console.error("Error al buscar usuario:", err);
    throw err; // Relanza el error
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (!user) {
    return res.status(401).json({ message: "Usuario no existente" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET
  );
  res.status(200).json({ token });
};

export const createUser = async (req, res) => {
  const { username, password, name, role, codigo } = req.body;
  try {
    const userFound = await User.findOne({ where: { username: username } });
    if (userFound) {
      return res.status(401).json({ message: "Usuario existente" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username: username,
      password: hashedPassword,
      name: name,
      role: role,
      codigo: codigo,
    });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    try {
      const destroy = await User.destroy({
        where: {
          username: user.username,
        },
      });
    } catch (err) {
      res.status(500).json({ err });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: {
        username: req.params.username,
      },
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getUsuariosAll = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: "usuario",
      },
    });

    if (users.length > 0) {
      res.status(200).json({ users });
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron usuarios con el rol 'usuario'." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
