// Almacén en memoria de pedidos. Se pierde al reiniciar el servidor (a propósito: sin BD).
let pedidos = [];
let siguienteId = 1;

export const pedidosStore = {
  guardar(datos) {
    const pedido = { id: siguienteId++, fecha: new Date().toISOString(), ...datos };
    pedidos.push(pedido);
    return pedido;
  },
  todos() {
    return [...pedidos].reverse(); // más recientes primero
  },
  reiniciar() {
    pedidos = [];
    siguienteId = 1;
  },
};
