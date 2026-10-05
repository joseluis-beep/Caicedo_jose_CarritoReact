/** Formatea como moneda colombiana con puntos de miles. Ej: 57000 -> "$57.000" */
export const formatoCOP = (valor) =>
  `$${Math.round(valor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
