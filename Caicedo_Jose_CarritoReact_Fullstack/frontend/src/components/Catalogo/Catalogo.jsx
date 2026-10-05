import { PRODUCTOS } from "../../data/productos";
import ProductoCard from "../ProductoCard/ProductoCard";
import "./Catalogo.css";

export default function Catalogo() {
  return (
    <section className="catalogo" aria-label="Catálogo de productos">
      {PRODUCTOS.map((producto, indice) => (
        <ProductoCard key={producto.id} producto={producto} indice={indice} />
      ))}
    </section>
  );
}
