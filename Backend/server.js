import express from "express";
import config from "./config.js";
import db from "./db.js";
import apiRoute from "./routes/index.js";
import cors from "cors";
import turnosDB from "./models/turnos.js";
import clientesDB from "./models/clientes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoute);

db.sync({ force: true }) //{ force: true }
  // .then(() => {
  //   return turnosDB.sync({ force: true });
  // })
  // .then(() => {
  //   return clientesDB.sync({ force: true });
  // })
  .then(() => {
    app.listen(config.SERVER_PORT);
    console.log("Server started on port " + config.SERVER_PORT);
  })
  .catch((err) => {
    console.log("Error starting server: " + err);
  });
