import { crearApp } from "./app.js";
import { env } from "./config/env.js";

crearApp().listen(env.port, () => {
  console.log(`API Tienda Palmira escuchando en http://localhost:${env.port}/api`);
});
