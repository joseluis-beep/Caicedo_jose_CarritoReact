import { Router } from "express";
import pedidosRoutes from "./pedidos.routes.js";

const router = Router();
router.get("/salud", (_req, res) => res.json({ estado: "ok", servicio: "tienda-palmira-api" }));
router.use("/pedidos", pedidosRoutes);

export default router;
