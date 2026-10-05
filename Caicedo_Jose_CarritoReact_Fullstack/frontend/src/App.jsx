import { useCallback, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Catalogo from "./components/Catalogo/Catalogo";
import CarritoPanel from "./components/CarritoPanel/CarritoPanel";

export default function App() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const abrir = useCallback(() => setCarritoAbierto(true), []);
  const cerrar = useCallback(() => setCarritoAbierto(false), []);

  return (
    <>
      <Navbar onAbrirCarrito={abrir} />
      <main className="contenedor">
        <header className="encabezado">
          <h1>Productos típicos de la región</h1>
          <p>Elige la cantidad y agrégala a tu carrito.</p>
        </header>
        <Catalogo />
      </main>
      <CarritoPanel abierto={carritoAbierto} onCerrar={cerrar} />
    </>
  );
}
