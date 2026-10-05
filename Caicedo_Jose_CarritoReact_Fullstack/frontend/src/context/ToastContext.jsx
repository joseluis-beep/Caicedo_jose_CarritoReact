import { createContext, useCallback, useMemo, useState } from "react";
import ToastContainer from "../components/Toast/ToastContainer";

export const ToastContext = createContext(null);

const MAX_TOASTS = 4;
let siguienteId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const cerrar = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * mostrar({ mensaje, tipo?, accion?, duracion? })
   * accion = { etiqueta, onClick }  -> botón dentro del toast (ej. confirmar eliminación)
   */
  const mostrar = useCallback(({ mensaje, tipo = "aviso", accion = null, duracion }) => {
    const id = siguienteId++;
    const ms = duracion ?? (accion ? 8000 : 4000);
    setToasts((prev) => [
      ...prev.filter((t) => t.mensaje !== mensaje).slice(-(MAX_TOASTS - 1)),
      { id, mensaje, tipo, accion, duracion: ms },
    ]);
  }, []);

  const valor = useMemo(() => ({ mostrar, cerrar }), [mostrar, cerrar]);

  return (
    <ToastContext.Provider value={valor}>
      {children}
      <ToastContainer toasts={toasts} onCerrar={cerrar} />
    </ToastContext.Provider>
  );
}
