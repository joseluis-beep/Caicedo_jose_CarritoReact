import Icono from "../Icono/Icono";
import ProductoIlustracion from "../ProductoIlustracion/ProductoIlustracion";
import { VISUALES, VISUAL_POR_DEFECTO } from "../../data/visuales";
import CampoCantidad from "../CampoCantidad/CampoCantidad";
import { useCarrito } from "../../hooks/useCarrito";
import { useToast } from "../../hooks/useToast";
import { formatoCOP } from "../../utils/formato";
import { MENSAJES } from "../../utils/mensajes";
import "./CarritoItem.css";

export default function CarritoItem({ linea }) {
  const { id, nombre, precio, stock, cantidad, subtotal } = linea;
  const { incrementar, decrementar, establecerCantidad, solicitarEliminar, quitarDirecto } =
    useCarrito();
  const { mostrar } = useToast();

  return (
    <li className="item">
      <div className="item__info">
        <div className="item__miniatura" style={{ background: (VISUALES[id] ?? VISUAL_POR_DEFECTO).fondo }}>
          <ProductoIlustracion id={id} />
        </div>
        <div>
          <h3 className="item__nombre">{nombre}</h3>
          <p className="item__precio">{formatoCOP(precio)} c/u</p>
        </div>
      </div>

      <div className="item__cantidad">
        <button type="button" className="item__btn" aria-label={`Disminuir cantidad de ${nombre}`} onClick={() => decrementar(id)}>
          <Icono nombre="menos" tamano={18} />
        </button>
        <CampoCantidad
          id={`carrito-cantidad-${id}`}
          etiqueta={`Cantidad de ${nombre} en el carrito`}
          valor={cantidad}
          max={stock}
          onConfirmar={(n) => establecerCantidad(id, n)}
          onMinimo={() => solicitarEliminar(id)}
          onMaximo={() => mostrar({ mensaje: MENSAJES.maximo })}
        />
        <button type="button" className="item__btn" aria-label={`Aumentar cantidad de ${nombre}`} onClick={() => incrementar(id)}>
          <Icono nombre="mas" tamano={18} />
        </button>
      </div>

      <div className="item__pie">
        <strong className="item__subtotal">{formatoCOP(subtotal)}</strong>
        <button type="button" className="item__quitar" onClick={() => quitarDirecto(id)} aria-label={`Quitar ${nombre} del carrito`}>
          <Icono nombre="papelera" tamano={16} /> Quitar
        </button>
      </div>
    </li>
  );
}
