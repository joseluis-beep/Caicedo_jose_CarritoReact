import { useEffect, useState } from "react";
import "./CampoCantidad.css";

/**
 * Campo numérico reutilizable (catálogo y carrito) – Punto 4.
 * Solo acepta enteros positivos:
 *  - onKeyDown / onBeforeInput bloquean cualquier tecla que no sea dígito (e, E, +, -, ., , y letras).
 *  - onPaste solo permite texto formado únicamente por dígitos.
 *  - onWheel quita el foco para que la rueda del mouse no cambie el valor.
 *  - onChange valida 0 (mínimo) y valores mayores al máximo (stock).
 *
 * Props:
 *  valor         cantidad confirmada actual
 *  max           stock máximo permitido
 *  onConfirmar   (n) => void   se llama con un entero válido 1..max
 *  onMinimo      () => void    se llama al intentar escribir 0
 *  onMaximo      () => void    se llama al intentar superar el stock
 */
export default function CampoCantidad({
  id,
  etiqueta,
  valor,
  max,
  onConfirmar,
  onMinimo,
  onMaximo,
  deshabilitado = false,
}) {
  const [texto, setTexto] = useState(String(valor));

  // Mantiene el texto sincronizado cuando el valor cambia desde fuera (botones +/−).
  useEffect(() => {
    setTexto(String(valor));
  }, [valor]);

  const alPresionarTecla = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return; // permite Ctrl+V, Ctrl+A, etc.
    if (e.key.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
  };

  // Teclados virtuales (Android) no envían e.key útil: se bloquea también al insertar texto.
  const alAntesDeEscribir = (e) => {
    if (e.data && !/^\d+$/.test(e.data)) e.preventDefault();
  };

  const alPegar = (e) => {
    const pegado = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pegado)) e.preventDefault();
  };

  const alCambiar = (e) => {
    const crudo = e.target.value;
    if (crudo === "") return setTexto(""); // permite borrar para escribir otro número
    if (!/^\d+$/.test(crudo)) return;

    const n = Number(crudo);
    if (n < 1) {
      setTexto(String(valor)); // conserva el valor anterior
      return onMinimo?.();
    }
    if (n > max) {
      setTexto(String(max));
      onMaximo?.();
      if (max !== valor) onConfirmar(max);
      return;
    }
    setTexto(String(n));
    onConfirmar(n);
  };

  const alPerderFoco = () => {
    if (texto === "") setTexto(String(valor));
  };

  return (
    <input
      id={id}
      className="campo-cantidad"
      type="number"
      inputMode="numeric"
      min={1}
      max={max}
      step={1}
      value={texto}
      disabled={deshabilitado}
      aria-label={etiqueta}
      autoComplete="off"
      onKeyDown={alPresionarTecla}
      onBeforeInput={alAntesDeEscribir}
      onPaste={alPegar}
      onDrop={(e) => e.preventDefault()}
      onWheel={(e) => e.currentTarget.blur()}
      onChange={alCambiar}
      onBlur={alPerderFoco}
    />
  );
}
