import Icono from "../Icono/Icono";
import { useCarrito } from "../../hooks/useCarrito";
import "./Navbar.css";

export default function Navbar({ onAbrirCarrito }) {
  const { totalUnidades } = useCarrito();

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <span className="navbar__marca">
        <Icono nombre="tienda" tamano={28} />
        TIENDA PALMIRA
      </span>

      <button
        type="button"
        className="navbar__carrito"
        onClick={onAbrirCarrito}
        aria-label={`Abrir carrito, ${totalUnidades} ${totalUnidades === 1 ? "unidad" : "unidades"}`}
      >
        <Icono nombre="carrito" tamano={28} />
        {totalUnidades > 0 && (
          <span key={totalUnidades} className="navbar__contador" data-testid="contador-carrito">{totalUnidades}</span>
        )}
      </button>
    </nav>
  );
}
