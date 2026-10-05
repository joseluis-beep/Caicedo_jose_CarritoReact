import { useEffect } from "react";
import Icono from "../Icono/Icono";
import "./Toast.css";

function ToastItem({ toast, onCerrar }) {
  // Se cierra solo después de unos segundos.
  useEffect(() => {
    const temporizador = setTimeout(() => onCerrar(toast.id), toast.duracion);
    return () => clearTimeout(temporizador);
  }, [toast.id, toast.duracion, onCerrar]);

  const confirmar = () => {
    toast.accion.onClick();
    onCerrar(toast.id);
  };

  return (
    <div className={`toast toast--${toast.tipo}`} role="status">
      <p className="toast__mensaje">{toast.mensaje}</p>
      <button type="button" className="toast__cerrar" onClick={() => onCerrar(toast.id)} aria-label="Cerrar mensaje">
        <Icono nombre="cerrar" tamano={16} />
      </button>
      {toast.accion && (
        <button type="button" className="toast__accion" onClick={confirmar}>
          {toast.accion.etiqueta}
        </button>
      )}
    </div>
  );
}

/** Contenedor de toasts anunciable por lectores de pantalla (aria-live). */
export default function ToastContainer({ toasts, onCerrar }) {
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onCerrar={onCerrar} />
      ))}
    </div>
  );
}
