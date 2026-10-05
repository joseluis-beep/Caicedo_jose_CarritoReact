import { CATALOGO } from "../data/catalogo.js";
import { pedidosStore } from "../data/pedidos.store.js";
import { AppError } from "../utils/AppError.js";

/**
 * Valida un pedido contra el catálogo del servidor.
 * Nunca se confía en los precios del cliente: el total se recalcula aquí.
 */
export function crearPedido(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError(400, "El pedido debe incluir al menos un producto");
  }

  const errores = [];
  const vistos = new Set();
  const lineas = [];

  items.forEach((item, indice) => {
    const posicion = `Producto #${indice + 1}`;
    const { id, cantidad } = item ?? {};
    const producto = Number.isInteger(id) ? CATALOGO.find((p) => p.id === id) : undefined;

    if (!producto) return errores.push(`${posicion}: el producto no existe`);
    if (vistos.has(id)) return errores.push(`${producto.nombre}: está repetido en el pedido`);
    vistos.add(id);

    // typeof number evita aceptar textos como "3e2" o "abc"
    if (typeof cantidad !== "number" || !Number.isInteger(cantidad) || cantidad < 1) {
      return errores.push(`${producto.nombre}: la cantidad debe ser un entero mayor o igual a 1`);
    }
    if (cantidad > producto.stock) {
      return errores.push(
        `${producto.nombre}: Este es el máximo de producto disponible en stock (${producto.stock})`
      );
    }

    lineas.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      subtotal: producto.precio * cantidad,
    });
  });

  if (errores.length > 0) throw new AppError(422, "Pedido inválido", errores);

  return pedidosStore.guardar({
    lineas,
    totalUnidades: lineas.reduce((suma, l) => suma + l.cantidad, 0),
    total: lineas.reduce((suma, l) => suma + l.subtotal, 0),
  });
}

export const listarPedidos = () => pedidosStore.todos();
