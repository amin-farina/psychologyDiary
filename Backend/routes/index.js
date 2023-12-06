import { Router } from "express";
import clientesRoutes from "./clientes.js";
import turnosRoutes from "./turnos.js";
import histrialRoutes from "./historial.js";
import turnosDisponiblesRoutes from "./turnosDisponibles.js";
import userRoutes from "./user.js";

const apiRoute = Router();

apiRoute.use("/clientes", clientesRoutes);
apiRoute.use("/turnos", turnosRoutes);
apiRoute.use("/historial", histrialRoutes);
apiRoute.use("/turnoDisponible", turnosDisponiblesRoutes);
apiRoute.use("/user", userRoutes);
export default apiRoute;
