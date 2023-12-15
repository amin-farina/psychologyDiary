import express from "express";
import config from "./config.js";
import db from "./db.js";
import apiRoute from "./routes/index.js";
import cors from "cors";
import env from "dotenv";
import User from "./models/user.js";
import Cliente from "./models/clientes.js";
import Turnos from "./models/turnos.js";
import TurnosDisponibles from "./models/turnosDisponibles.js";

const app = express();

app.use(cors());
app.use(express.json());

env.config();
app.use("/api", apiRoute);

db.sync() //{ force: true }
  .then(() => {
    User.hasMany(Cliente, { foreignKey: "username" });
    TurnosDisponibles.belongsTo(Cliente, { foreignKey: "username" });
    Turnos.belongsTo(Cliente, { foreignKey: "dni" });
    Cliente.belongsTo(User, { foreignKey: "username" });
    Cliente.hasMany(Turnos, { foreignKey: "dni" });
    Cliente.hasMany(TurnosDisponibles, { foreignKey: "username" });

    app.listen(config.SERVER_PORT);
    console.log("Server started on port " + config.SERVER_PORT);
  })
  .catch((err) => {
    console.log("Error starting server: " + err);
  });
