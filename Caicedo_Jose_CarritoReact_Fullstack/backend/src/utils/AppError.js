/** Error controlado de la API: lleva código HTTP y detalles opcionales. */
export class AppError extends Error {
  constructor(status, mensaje, detalles = []) {
    super(mensaje);
    this.status = status;
    this.detalles = detalles;
  }
}
