# 🛒 Tienda Palmira – Carrito de Compras (Full-Stack)

Reto práctico React · SENA – CBI Palmira · Desarrollo Front-End con React
**Frontend:** React 18 + Vite (íconos SVG propios y paleta suave en `src/styles/variables.css`) · **Backend:** Node.js + Express (sin base de datos, datos en memoria)

| Dato | Valor |
|---|---|
| **Aprendiz** | Jose Luis Caicedo Vergara |
| **Ficha** | _(escribir número de ficha)_ |
| **Instructor** | Daniel Alfonso Martínez Payán |
| **Tecnología usada** | ☑ React ☐ HTML + CSS + JS puros |
| **Repositorio público** | _(pegar enlace de GitHub/GitLab)_ |
| **Despliegue (opcional)** | _(pegar enlace)_ |

## ▶️ Instalación y ejecución

Requisitos: Node.js 18 o superior.

```bash
git clone <[URL_DEL_REPOSITORIO](https://github.com/joseluis-beep/Caicedo_jose_CarritoReact.git)>
cd Caicedo_Jose_CarritoReact_Fullstack
npm install          # instala frontend y backend (npm workspaces)
npm run dev          # frontend en http://localhost:5173 y API en http://localhost:3001
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta backend y frontend a la vez |
| `npm run dev -w frontend` / `-w backend` | Levanta solo uno |
| `npm test` | Pruebas del backend (8) y del frontend (14) |
| `npm run build` | Compila el frontend para producción |
| `npm start` | Inicia solo el backend |

> El frontend funciona completo sin el backend (catálogo, validaciones, toasts y totales).
> El backend solo se usa al pulsar **Finalizar compra**.

## 📁 Estructura

```
Caicedo_Jose_CarritoReact_Fullstack/
├── package.json            # Workspaces + scripts globales
├── evidencias/             # Capturas para la rúbrica
├── backend/
│   ├── .env.example        # PORT y CORS_ORIGIN (opcionales)
│   ├── src/
│   │   ├── config/env.js
│   │   ├── data/           # catalogo.js y pedidos.store.js (memoria, sin BD)
│   │   ├── routes/         # Definición de rutas
│   │   ├── controllers/    # Reciben la petición y responden
│   │   ├── services/       # Reglas de negocio (validación de stock y total)
│   │   ├── middlewares/    # notFound y errorHandler
│   │   ├── utils/AppError.js
│   │   ├── app.js          # Configuración de Express
│   │   └── server.js       # Arranque
│   └── tests/pedidos.test.js
└── frontend/
    ├── public/
    └── src/
        ├── components/     # Navbar, Catalogo, ProductoCard, ProductoIlustracion, Icono,
        │                   # CampoCantidad, CarritoPanel, CarritoItem, Toast (JSX + CSS)
        ├── context/        # CarritoContext, ToastContext
        ├── hooks/          # useCarrito, useToast
        ├── services/api.js # Cliente HTTP del backend
        ├── data/productos.js  # Array JSON del catálogo (Punto 1, sin campos extra)
        ├── data/visuales.js   # Categoría y color de fondo de cada tarjeta
        ├── utils/          # formatoCOP y mensajes
        ├── styles/
        └── __tests__/casos-instructor.test.jsx
```

## 🔌 API del backend

Base: `http://localhost:3001/api` (en desarrollo el frontend usa el proxy `/api`).

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/salud` | Estado del servicio |
| POST | `/pedidos` | Valida y registra un pedido. Body: `{ "items": [{ "id": 1, "cantidad": 2 }] }` |
| GET | `/pedidos` | Lista los pedidos registrados (en memoria) |

El servidor valida: producto existente y sin repetir, cantidad **entera ≥ 1** (rechaza `0`, negativos, decimales y textos como `"3e2"`), cantidad **≤ stock**, e ignora los precios enviados por el cliente (recalcula subtotales y total).
Errores: `400` (cuerpo inválido), `422` (pedido inválido, con lista de detalles), `404` (ruta inexistente).

## ✅ Casos de prueba del instructor

Cada caso está automatizado en `frontend/src/__tests__/casos-instructor.test.jsx` (ejecutar `npm test`).

| # | Acción | Resultado esperado | Estado |
|---|---|---|---|
| 1 | Teclear `e`, `E`, `+`, `-`, `.` o `,` | No escribe nada | ✅ |
| 2 | Pegar `-5`, `3e2` o `abc` | No se pega | ✅ |
| 3 | Escribir `0` en la tarjeta | Conserva el valor y toast de mínimo 1 | ✅ |
| 4 | Escribir `0` en el carrito | No cambia; toast del mínimo con opción de eliminar | ✅ |
| 5 | Escribir `999` con stock 8 | Se corrige a 8 + toast de máximo | ✅ |
| 6 | Panela: agregar 2 y luego 2 más | Queda en 3 + toast de máximo | ✅ |
| 7 | `+` en el carrito con cantidad = stock | No sube + toast de máximo | ✅ |
| 8 | `−` con cantidad 1 | Toast de mínimo; al confirmar elimina y recalcula | ✅ |
| 9 | Agregar dos veces el mismo producto | Una sola línea | ✅ |
| 10 | Café ×2, Panela ×3, Arepa ×1 | $57.000, $29.400, $12.000 · Total $98.400 | ✅ |
| 11 | Agregar todo el stock (Chocolate ×1) | Botón Agregar deshabilitado | ✅ |
| 12 | Observar la navbar | Ícono a la derecha con contador de unidades | ✅ |

## 🎨 Diseño y animaciones (valor agregado)

El PDF no restringe colores, imágenes ni animaciones (las animaciones sutiles se mencionan como valor agregado), por eso se añadieron:

- **Tarjetas de producto** con ilustración SVG semi-realista (gradientes, brillos y sombras; sin imágenes externas), categoría, precio, barra de unidades disponibles y avisos "¡Últimas unidades!" / "Sin stock".
- **Animaciones:** aparición escalonada de las tarjetas, ilustración que flota, se agranda al pasar el mouse y salta al agregar al carrito; rebote del contador de la navbar; entrada suave de las líneas del carrito.
- **Accesibilidad:** con `prefers-reduced-motion` todas las animaciones se desactivan.
- El array `PRODUCTOS` conserva exactamente `id`, `nombre`, `precio` y `stock`; lo visual vive aparte en `data/visuales.js`.

## 🔧 Correcciones respecto a la versión anterior

1. **Teclados móviles:** en Android la tecla llega como `Unidentified`, por lo que `onKeyDown` no bloqueaba la `e`. Se añadió `onBeforeInput` en `CampoCantidad`.
2. **Formato de moneda:** ahora es exactamente `$57.000` (antes `Intl` insertaba un espacio especial: `$ 57.000`).
3. **Accesibilidad del panel:** el foco queda atrapado en el carrito (incluyendo el botón del toast "Sí, eliminar"), se bloquea el scroll del fondo y al cerrar el foco vuelve al ícono del carrito.
4. **Retroalimentación al eliminar:** ahora aparece un toast confirmando que el producto fue eliminado (antes desaparecía en silencio).
5. **Estabilidad:** `abrir`/`cerrar` del panel con `useCallback` para no reiniciar listeners en cada render.
6. **Pruebas automáticas** de los 12 casos del instructor y de la API.
7. **Nuevo:** backend Express con validación de stock del lado del servidor y botón **Finalizar compra**.

## 📸 Evidencias

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---|---|---|
| 1 | Navbar e ícono con contador | `evidencias/01-navbar.png` | Sí |
| 2 | Agregar producto desde el catálogo | `evidencias/02-agregar.png` | Sí |
| 3 | Bloqueo de "e", negativos y 0 | `evidencias/03-validaciones.png` | Sí |
| 4 | Toast de stock máximo | `evidencias/04-toast-maximo.png` | Sí |
| 5 | Toast de mínimo con opción de eliminar | `evidencias/05-toast-minimo.png` | Sí |
| 6 | Subtotales y total con varios productos | `evidencias/06-totales.png` | Sí |
| 7 | Producto eliminado y total recalculado | `evidencias/07-eliminado.png` | Sí |

## ✔️ Verificación y entrega

- [x] Corre con `npm install` y `npm run dev`
- [x] Catálogo desde un array JSON con id, nombre, precio y stock (`frontend/src/data/productos.js`)
- [x] Ícono del carrito en la navbar, a la derecha, con contador
- [x] Ningún campo acepta letras (ni `e`), signos, puntos, comas, 0 ni negativos
- [x] Nunca se supera el stock y siempre aparece el toast de máximo
- [x] Con cantidad 1, al restar (o escribir 0) aparece el toast del mínimo con opción de eliminar
- [x] Subtotales y total cuadran al agregar, cambiar cantidades o eliminar
- [ ] Repositorio público verificado con `git clone` en otro equipo
- [ ] Capturas añadidas a `/evidencias`
