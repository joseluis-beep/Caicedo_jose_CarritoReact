import { useState } from "react";
import CampoCantidad from "../CampoCantidad/CampoCantidad";
import Icono from "../Icono/Icono";
import ProductoIlustracion from "../ProductoIlustracion/ProductoIlustracion";
import { useCarrito } from "../../hooks/useCarrito";
import { useToast } from "../../hooks/useToast";
import { VISUALES, VISUAL_POR_DEFECTO } from "../../data/visuales";
import { formatoCOP } from "../../utils/formato";
import { MENSAJES } from "../../utils/mensajes";
import "./ProductoCard.css";

export default function ProductoCard({ producto, indice = 0 }) {
  const { id, nombre, precio, stock } = producto;
  const { agregar, cantidadEnCarrito } = useCarrito();
  const { mostrar } = useToast();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false); // dispara la animación de "agregado"

  const visual = VISUALES[id] ?? VISUAL_POR_DEFECTO;
  const enCarrito = cantidadEnCarrito(id);
  const disponible = stock - enCarrito;
  const agotado = disponible <= 0; // sin unidades disponibles para agregar
  const ultimas = !agotado && disponible <= 2;

  const alAgregar = () => {
    agregar(id, cantidad);
    setCantidad(1);
    setAgregado(true);
  };

  return (
    <article
      className={`producto${agotado ? " producto--agotado" : ""}`}
      style={{ "--i": indice, "--fondo": visual.fondo }}
    >
      <div className="producto__media">
        <span className="producto__categoria">{visual.categoria}</span>
        {agotado && <span className="producto__chip producto__chip--agotado">Sin stock</span>}
        {ultimas && <span className="producto__chip producto__chip--ultimas">¡Últimas unidades!</span>}
        <div className="producto__arte">
          <ProductoIlustracion
            id={id}
            className={`producto__ilustracion${agregado ? " producto__ilustracion--agregado" : ""}`}
            onAnimationEnd={() => setAgregado(false)}
          />
        </div>
      </div>

      <div className="producto__cuerpo">
        <h2 className="producto__nombre">{nombre}</h2>
        <p className="producto__precio">{formatoCOP(precio)}</p>

        <div className="producto__stock">
          <p>
            Stock disponible: <strong>{stock}</strong>
            {enCarrito > 0 && <span className="producto__en-carrito"> · En tu carrito: {enCarrito}</span>}
          </p>
          <div
            className="producto__barra"
            role="progressbar"
            aria-label="Unidades que aún puedes agregar"
            aria-valuemin={0}
            aria-valuemax={stock}
            aria-valuenow={Math.max(disponible, 0)}
          >
            <span style={{ width: `${(Math.max(disponible, 0) / stock) * 100}%` }} />
          </div>
        </div>

        <div className="producto__acciones">
          <CampoCantidad
            id={`cantidad-${id}`}
            etiqueta={`Cantidad de ${nombre}`}
            valor={cantidad}
            max={stock}
            deshabilitado={agotado}
            onConfirmar={setCantidad}
            onMinimo={() => mostrar({ mensaje: MENSAJES.minimoCatalogo })}
            onMaximo={() => mostrar({ mensaje: MENSAJES.maximo })}
          />
          <button type="button" className="producto__agregar" onClick={alAgregar} disabled={agotado}>
            {!agotado && <Icono nombre="carrito" tamano={18} />}
            {agotado ? "Sin stock" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
