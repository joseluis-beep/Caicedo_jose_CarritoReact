import { AppError } from "../utils/AppError.js";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: { mensaje: err.message, detalles: err.detalles } });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { mensaje: "El cuerpo de la solicitud no es un JSON válido", detalles: [] } });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: { mensaje: "La solicitud es demasiado grande", detalles: [] } });
  }
  console.error(err);
  res.status(500).json({ error: { mensaje: "Error interno del servidor", detalles: [] } });
}
