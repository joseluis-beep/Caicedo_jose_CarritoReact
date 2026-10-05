import * as pedidosService from "../services/pedidos.service.js";

export const crear = (req, res) => {
  const pedido = pedidosService.crearPedido(req.body?.items);
  res.status(201).json({ pedido });
};

export const listar = (_req, res) => {
  res.json({ pedidos: pedidosService.listarPedidos() });
};
