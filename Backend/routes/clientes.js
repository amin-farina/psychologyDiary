import { Router } from "express";
import {
  getAllClientes,
  getClienteById,
  createCliente,
  deleteCliente,
  updateCliente,
  getClienteByUser,
} from "../controllers/clientes.js";

const clienteRoutes = Router();

clienteRoutes.get("/", getAllClientes);
clienteRoutes.get("/getclienteid/:dni", getClienteById);
clienteRoutes.get("/getusername/:username", getClienteByUser);
clienteRoutes.post("/create", createCliente);
clienteRoutes.put("/:dni", updateCliente);
clienteRoutes.delete("/:dni", deleteCliente);

export default clienteRoutes;
