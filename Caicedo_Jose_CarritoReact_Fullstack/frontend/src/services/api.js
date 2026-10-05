// Cliente HTTP del backend. El catálogo vive en el frontend (Punto 1 del reto);
// la API solo valida y registra el pedido al finalizar la compra.
const BASE_URL = (import.meta.env.VITE_API_URL ?? "/api").replace(/\/$/, "");

export async function crearPedido(items) {
  let respuesta;
  try {
    respuesta = await fetch(`${BASE_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.");
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    const mensaje = datos?.error?.mensaje ?? "Error inesperado del servidor.";
    const detalles = datos?.error?.detalles ?? [];
    throw new Error(detalles.length ? `${mensaje}: ${detalles.join(" · ")}` : mensaje);
  }
  return datos.pedido;
}
