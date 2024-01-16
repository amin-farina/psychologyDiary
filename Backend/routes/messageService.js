import { Router } from "express";
import { sendMessage, getTextMessageInput } from "../services/enviarMensaje.js";

const messageService = Router();

messageService.post("/", function (req, res, next) {
  var data = getTextMessageInput(
    process.env.RECIPIENT_WAID,
    "Estoy pudiendo enviar mensaje de warap je!"
  );

  sendMessage(data)
    .then(function (response) {
      res.sendStatus(200);
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
      res.sendStatus(500);
      return;
    });
});

export default messageService;
