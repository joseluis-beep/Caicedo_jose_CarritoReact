import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCTOS } from "../data/productos";
import { useToast } from "../hooks/useToast";
import { crearPedido } from "../services/api";
import { formatoCOP } from "../utils/formato";
import { MENSAJES } from "../utils/mensajes";

export const CarritoContext = createContext(null);

const CLAVE_STORAGE = "tienda-palmira:carrito";
const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === id);

/** Lee el carrito guardado y lo sanea (ids válidos, enteros, sin superar stock). */
function cargarCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "[]");
    if (!Array.isArray(datos)) return [];
    return datos
      .map((item) => {
        const producto = buscarProducto(item?.id);
        const cantidad = Number(item?.cantidad);
        if (!producto || !Number.isInteger(cantidad) || cantidad < 1) return null;
        return { id: producto.id, cantidad: Math.min(cantidad, producto.stock) };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  const { mostrar } = useToast();
  // items = [{ id, cantidad }]  (una sola línea por producto)
  const [items, setItems] = useState(cargarCarrito);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }, [items]);

  const cantidadEnCarrito = useCallback(
    (id) => items.find((i) => i.id === id)?.cantidad ?? 0,
    [items]
  );

  const avisarMaximo = useCallback(
    () => mostrar({ mensaje: MENSAJES.maximo, tipo: "aviso" }),
    [mostrar]
  );

  const fijarCantidad = useCallback((id, cantidad) => {
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
        : [...prev, { id, cantidad }]
    );
  }, []);

  const eliminar = useCallback(
    (id) => {
      const producto = buscarProducto(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      mostrar({ mensaje: MENSAJES.eliminado(producto.nombre), tipo: "info" });
    },
    [mostrar]
  );

  /** Toast del mínimo con botón para confirmar la eliminación. */
  const solicitarEliminar = useCallback(
    (id) => {
      const producto = buscarProducto(id);
      mostrar({
        mensaje: MENSAJES.minimoCarrito(producto.nombre),
        tipo: "aviso",
        accion: { etiqueta: "Sí, eliminar", onClick: () => eliminar(id) },
      });
    },
    [eliminar, mostrar]
  );

  /** Punto 3 + 5: agregar desde el catálogo (suma a la línea existente y respeta el stock). */
  const agregar = useCallback(
    (id, cantidad) => {
      const producto = buscarProducto(id);
      let nueva = cantidadEnCarrito(id) + cantidad;
      if (nueva > producto.stock) {
        nueva = producto.stock;
        avisarMaximo();
      }
      fijarCantidad(id, nueva);
    },
    [cantidadEnCarrito, avisarMaximo, fijarCantidad]
  );

  /** Cantidad escrita directamente en el campo del carrito. */
  const establecerCantidad = useCallback(
    (id, cantidad) => {
      const producto = buscarProducto(id);
      if (cantidad < 1) return solicitarEliminar(id);
      if (cantidad > producto.stock) {
        avisarMaximo();
        return fijarCantidad(id, producto.stock);
      }
      fijarCantidad(id, cantidad);
    },
    [solicitarEliminar, avisarMaximo, fijarCantidad]
  );

  const incrementar = useCallback(
    (id) => {
      const producto = buscarProducto(id);
      const actual = cantidadEnCarrito(id);
      if (actual >= producto.stock) return avisarMaximo();
      fijarCantidad(id, actual + 1);
    },
    [cantidadEnCarrito, avisarMaximo, fijarCantidad]
  );

  const decrementar = useCallback(
    (id) => {
      const actual = cantidadEnCarrito(id);
      if (actual <= 1) return solicitarEliminar(id);
      fijarCantidad(id, actual - 1);
    },
    [cantidadEnCarrito, solicitarEliminar, fijarCantidad]
  );

  /** Envía el pedido al backend, que lo valida de nuevo (stock y precios). */
  const finalizarCompra = useCallback(async () => {
    if (items.length === 0 || enviando) return;
    setEnviando(true);
    try {
      const pedido = await crearPedido(items.map(({ id, cantidad }) => ({ id, cantidad })));
      setItems([]);
      mostrar({
        mensaje: MENSAJES.pedidoOk(pedido.id, formatoCOP(pedido.total)),
        tipo: "info",
        duracion: 7000,
      });
    } catch (error) {
      mostrar({ mensaje: error.message, tipo: "error", duracion: 8000 });
    } finally {
      setEnviando(false);
    }
  }, [items, enviando, mostrar]);

  // Líneas con datos del producto y subtotal (precio × cantidad)
  const lineas = useMemo(
    () =>
      items.map((item) => {
        const producto = buscarProducto(item.id);
        return { ...producto, cantidad: item.cantidad, subtotal: producto.precio * item.cantidad };
      }),
    [items]
  );

  const totalUnidades = useMemo(() => lineas.reduce((s, l) => s + l.cantidad, 0), [lineas]);
  const totalCompra = useMemo(() => lineas.reduce((s, l) => s + l.subtotal, 0), [lineas]);

  const valor = {
    lineas,
    totalUnidades,
    totalCompra,
    enviando,
    cantidadEnCarrito,
    agregar,
    establecerCantidad,
    incrementar,
    decrementar,
    quitarDirecto: eliminar,
    solicitarEliminar,
    finalizarCompra,
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}
