import { useEffect, useRef } from "react";
import CarritoItem from "../CarritoItem/CarritoItem";
import Icono from "../Icono/Icono";
import { useCarrito } from "../../hooks/useCarrito";
import { formatoCOP } from "../../utils/formato";
import "./CarritoPanel.css";

const FOCALIZABLES = "button:not([disabled]), input:not([disabled])";

export default function CarritoPanel({ abierto, onCerrar }) {
  const { lineas, totalUnidades, totalCompra, enviando, finalizarCompra } = useCarrito();
  const panelRef = useRef(null);
  const botonCerrar = useRef(null);

  useEffect(() => {
    if (!abierto) return;
    const elementoPrevio = document.activeElement;
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // evita scroll de la página de fondo
    botonCerrar.current?.focus();

    const alTeclear = (e) => {
      if (e.key === "Escape") return onCerrar();
      if (e.key !== "Tab") return;

      // El foco circula dentro del panel y de los toasts (para poder confirmar "Sí, eliminar").
      const toasts = document.querySelector(".toasts");
      const orden = [
        ...panelRef.current.querySelectorAll(FOCALIZABLES),
        ...(toasts ? toasts.querySelectorAll("button") : []),
      ];
      if (orden.length === 0) return;
      const primero = orden[0];
      const ultimo = orden[orden.length - 1];
      const activo = document.activeElement;
      const dentro = orden.includes(activo);

      if (!dentro || (e.shiftKey && activo === primero)) {
        e.preventDefault();
        (e.shiftKey && dentro ? ultimo : primero).focus();
      } else if (!e.shiftKey && activo === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", alTeclear);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = overflowOriginal;
      elementoPrevio?.focus?.();
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div className="panel-fondo" onClick={onCerrar}>
      <aside
        ref={panelRef}
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="panel__encabezado">
          <h2 className="panel__titulo"><Icono nombre="carrito" tamano={24} /> Tu carrito</h2>
          <button ref={botonCerrar} type="button" className="panel__cerrar" onClick={onCerrar} aria-label="Cerrar carrito">
            <Icono nombre="cerrar" tamano={20} />
          </button>
        </header>

        <div className="panel__cuerpo">
          {lineas.length === 0 ? (
            <p className="panel__vacio">Tu carrito está vacío. Agrega productos del catálogo.</p>
          ) : (
            <ul className="panel__lista">
              {lineas.map((linea) => (
                <CarritoItem key={linea.id} linea={linea} />
              ))}
            </ul>
          )}
        </div>

        <footer className="panel__totales">
          <p>
            <span>Total de unidades</span>
            <strong data-testid="total-unidades">{totalUnidades}</strong>
          </p>
          <p className="panel__total">
            <span>Total de la compra</span>
            <strong data-testid="total-compra">{formatoCOP(totalCompra)}</strong>
          </p>
          <button
            type="button"
            className="panel__finalizar"
            onClick={finalizarCompra}
            disabled={lineas.length === 0 || enviando}
          >
            {enviando ? "Enviando pedido…" : "Finalizar compra"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
