import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export function crearApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(cors({ origin: env.corsOrigins }));
  app.use(express.json({ limit: "10kb" }));
  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
