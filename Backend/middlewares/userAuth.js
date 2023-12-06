import User from "../models/user";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, "user");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token no válido." });
  }
};
