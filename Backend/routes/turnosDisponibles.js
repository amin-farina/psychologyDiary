import { Router } from "express";
import {
  createTurnoDisponible,
  deleteTurnoDisponible,
  getAllTurnosDisponibles,
  getTurnoDisponibleById,
  getTurnosDisponiblesbyUsername,
  updateTurnoDisponible,
} from "../controllers/turnosDisponibles.js";

const turnosDisponiblesRoutes = Router();

turnosDisponiblesRoutes.get("/", getAllTurnosDisponibles);
turnosDisponiblesRoutes.get("/getid/:turnoId", getTurnoDisponibleById);
turnosDisponiblesRoutes.get("/getusername/:username", getTurnosDisponiblesbyUsername);
turnosDisponiblesRoutes.post("/create", createTurnoDisponible);
turnosDisponiblesRoutes.put("/:turnoId", updateTurnoDisponible);
turnosDisponiblesRoutes.delete("/:turnoId", deleteTurnoDisponible);

export default turnosDisponiblesRoutes;
