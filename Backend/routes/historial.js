import { Router } from "express";
import {
  getAllHistorial,
  getHistorialByIdCliente,
  getHistorialByDate,
} from "../controllers/historial.js";

const historialRoutes = Router();

historialRoutes.get("/", getAllHistorial);
historialRoutes.get("/idCliente/:idCliente", getHistorialByIdCliente);
historialRoutes.get("/fecha/:fechaHistorial", getHistorialByDate);

export default historialRoutes;
