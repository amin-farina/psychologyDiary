import { Router } from "express";
import {
  getAllTurnos,
  getTurnoById,
  createTurno,
  deleteTurno,
  updateTurno,
  getTurnoByUser,
} from "../controllers/turnos.js";

const turnoRoutes = Router();

turnoRoutes.get("/", getAllTurnos);
turnoRoutes.get("/getusername/:username", getTurnoByUser);
turnoRoutes.get("/getid/:turnoId", getTurnoById);
turnoRoutes.post("/create", createTurno);
turnoRoutes.put("/update/:turnoId", updateTurno);
turnoRoutes.delete("/:turnoId", deleteTurno);

export default turnoRoutes;
