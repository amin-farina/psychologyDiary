import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserByUsername,
  loginUser,
  updateUser,
} from "../controllers/user.js";

const userRoutes = Router();

userRoutes.get("/", getAllUser);
userRoutes.get("/:username", getUserByUsername);
userRoutes.post("/create", createUser);
userRoutes.post("/login", loginUser);
userRoutes.put("/update/:username", updateUser);
userRoutes.delete("/:username", deleteUser);

export default userRoutes;
