// Mensajes centralizados para los toasts.
export const MENSAJES = {
  maximo: "Este es el máximo de producto disponible en stock",
  minimoCatalogo: "La cantidad mínima es 1.",
  minimoCarrito: (nombre) =>
    `Esta es la cantidad mínima (1). ¿Desea eliminar «${nombre}» del carrito?`,
  eliminado: (nombre) => `«${nombre}» fue eliminado del carrito.`,
  pedidoOk: (id, total) => `Pedido #${id} confirmado. Total: ${total}`,
};
