import { Router } from "express";
import {
  getAllClientes,
  getClienteById,
  createCliente,
  deleteCliente,
  updateCliente,
} from "../controllers/clientes.js";

const clienteRoutes = Router();

clienteRoutes.get("/", getAllClientes);
clienteRoutes.get("/:clienteId", getClienteById);
clienteRoutes.post("/create", createCliente);
clienteRoutes.put("/:clienteId", updateCliente);
clienteRoutes.delete("/:clienteId", deleteCliente);

export default clienteRoutes;
