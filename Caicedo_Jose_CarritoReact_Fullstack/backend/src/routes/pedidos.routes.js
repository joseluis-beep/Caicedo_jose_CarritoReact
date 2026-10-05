import { Router } from "express";
import * as controller from "../controllers/pedidos.controller.js";

const router = Router();
router.post("/", controller.crear);
router.get("/", controller.listar);

export default router;
