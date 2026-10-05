// Íconos SVG propios (sin librerías externas). Decorativos: el botón que los contiene lleva aria-label.
const TRAZOS = {
  tienda: (
    <>
      <path d="M4 9.5 5.6 4h12.8L20 9.5" />
      <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
      <path d="M5.5 12.5V20h13v-7.5" />
      <path d="M10 20v-4.5h4V20" />
    </>
  ),
  carrito: (
    <>
      <path d="M3 4h2.2l2.3 11h10.3l2-8H6.3" />
      <circle cx="9.5" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
    </>
  ),
  cerrar: <path d="M6 6l12 12M18 6 6 18" />,
  mas: <path d="M12 5v14M5 12h14" />,
  menos: <path d="M5 12h14" />,
  papelera: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="M6.5 7l.9 12.5h9.2L17.5 7" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),
};

export default function Icono({ nombre, tamano = 22 }) {
  return (
    <svg
      className="icono"
      viewBox="0 0 24 24"
      width={tamano}
      height={tamano}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {TRAZOS[nombre]}
    </svg>
  );
}
