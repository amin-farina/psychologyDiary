import { Router } from "express";
import {
  createTurnoDisponible,
  deleteTurnoDisponible,
  getAllTurnosDisponibles,
  getTurnoDisponibleById,
  updateTurnoDisponible,
} from "../controllers/turnosDisponibles.js";

const turnosDisponiblesRoutes = Router();

turnosDisponiblesRoutes.get("/", getAllTurnosDisponibles);
turnosDisponiblesRoutes.get("/:turnoId", getTurnoDisponibleById);
turnosDisponiblesRoutes.post("/create", createTurnoDisponible);
turnosDisponiblesRoutes.put("/:turnoId", updateTurnoDisponible);
turnosDisponiblesRoutes.delete("/:turnoId", deleteTurnoDisponible);

export default turnosDisponiblesRoutes;
