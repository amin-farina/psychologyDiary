import axios from "axios";

export const sendMessage = async (data) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado que no está en el rango 2xx
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      console.error("No response received from the server");
    } else {
      // Algo sucedió en la configuración de la solicitud que desencadenó un error
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
};

export const getTextMessageInput = (recipient, text) => {
  return JSON.stringify({
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "MESSAGE_TAG",
    message: {
      text: text,
    },
  });
};
