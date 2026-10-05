import { AppError } from "../utils/AppError.js";

export const notFound = (req, _res, next) =>
  next(new AppError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
