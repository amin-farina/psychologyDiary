import { Router } from "express";
import clientesRoutes from "./clientes.js";
import turnosRoutes from "./turnos.js";
import histrialRoutes from "./historial.js";
import turnosDisponiblesRoutes from "./turnosDisponibles.js";

const apiRoute = Router();

apiRoute.use("/clientes", clientesRoutes);
apiRoute.use("/turnos", turnosRoutes);
apiRoute.use("/historial", histrialRoutes);
apiRoute.use("/turnoDisponible", turnosDisponiblesRoutes)
export default apiRoute;
