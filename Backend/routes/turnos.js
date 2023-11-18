import { Router } from "express";
import {
  getAllTurnos,
  getTurnoById,
  createTurno,
  deleteTurno,
  updateTurno,
} from "../controllers/turnos.js";

const turnoRoutes = Router();

turnoRoutes.get("/", getAllTurnos);
turnoRoutes.get("/:turnoId", getTurnoById);
turnoRoutes.post("/create", createTurno);
turnoRoutes.put("/:turnoId", updateTurno);
turnoRoutes.delete("/:turnoId", deleteTurno);

export default turnoRoutes;
