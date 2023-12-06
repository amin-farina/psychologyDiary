import jwt from "jsonwebtoken";

export const decodeJWT = (token) => {
  const KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
  try {
    const decoded = jwt.verify(token, KEY.toString("utf-8"));
    return decoded;
  } catch (error) {
    console.log("Error al decodificar el token: ", token, error.message);
    return null;
  }
};
