import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserByUsername,
  getUsuariosAll,
  loginUser,
  updateUser,
} from "../controllers/user.js";

const userRoutes = Router();

userRoutes.get("/", getAllUser);
userRoutes.get("/byUsername/:username", getUserByUsername);
userRoutes.get("/getUsuarios", getUsuariosAll);
userRoutes.post("/create", createUser);
userRoutes.post("/login", loginUser);
userRoutes.put("/update/:username", updateUser);
userRoutes.delete("/:username", deleteUser);

export default userRoutes;
