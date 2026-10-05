import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach, describe, it, expect } from "vitest";
import App from "../App";
import { ToastProvider } from "../context/ToastContext";
import { CarritoProvider } from "../context/CarritoContext";
import { crearPedido } from "../services/api";

vi.mock("../services/api", () => ({ crearPedido: vi.fn() }));

const MAXIMO = "Este es el máximo de producto disponible en stock";

function montar() {
  const user = userEvent.setup();
  render(
    <ToastProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </ToastProvider>
  );
  return user;
}

const tarjeta = (nombre) =>
  within(screen.getByRole("heading", { name: nombre, level: 2 }).closest("article"));

async function escribir(user, campo, texto) {
  await user.clear(campo);
  await user.type(campo, texto);
}

async function agregar(user, nombre, cantidad = 1) {
  const t = tarjeta(nombre);
  await escribir(user, t.getByRole("spinbutton"), String(cantidad));
  await user.click(t.getByRole("button", { name: "Agregar" }));
}

async function abrirCarrito(user) {
  await user.click(screen.getByRole("button", { name: /Abrir carrito/ }));
  return within(screen.getByRole("dialog"));
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("Casos de prueba del instructor", () => {
  it("1. Las teclas e, E, +, -, . y , no escriben nada", async () => {
    const user = montar();
    const campo = tarjeta("Café de Huila 500 g").getByRole("spinbutton");
    for (const tecla of ["e", "E", "+", "-", ".", ","]) {
      await user.type(campo, tecla);
      expect(campo).toHaveValue(1);
    }
  });

  it("2. Pegar -5, 3e2 o abc no se acepta", async () => {
    const user = montar();
    const campo = tarjeta("Café de Huila 500 g").getByRole("spinbutton");
    await user.click(campo);
    for (const texto of ["-5", "3e2", "abc"]) {
      await user.paste(texto);
      expect(campo).toHaveValue(1);
    }
  });

  it("3. Escribir 0 en la tarjeta conserva el valor y muestra toast de mínimo", async () => {
    const user = montar();
    const campo = tarjeta("Café de Huila 500 g").getByRole("spinbutton");
    await escribir(user, campo, "0");
    expect(campo).toHaveValue(1);
    expect(await screen.findByText("La cantidad mínima es 1.")).toBeInTheDocument();
  });

  it("4. Escribir 0 en el carrito no cambia la cantidad y ofrece eliminar", async () => {
    const user = montar();
    await agregar(user, "Café de Huila 500 g");
    const panel = await abrirCarrito(user);
    const campo = panel.getByRole("spinbutton");
    await escribir(user, campo, "0");
    expect(campo).toHaveValue(1);
    expect(await screen.findByText(/¿Desea eliminar/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sí, eliminar" })).toBeInTheDocument();
  });

  it("5. Escribir 999 con stock 8 se corrige a 8 con toast", async () => {
    const user = montar();
    const campo = tarjeta("Café de Huila 500 g").getByRole("spinbutton");
    await escribir(user, campo, "999");
    expect(campo).toHaveValue(8);
    expect(await screen.findByText(MAXIMO)).toBeInTheDocument();
  });

  it("6. Panela (stock 3): agregar 2 y luego 2 más queda en 3 con toast", async () => {
    const user = montar();
    await agregar(user, "Panela orgánica 1 kg", 2);
    await agregar(user, "Panela orgánica 1 kg", 2);
    expect(screen.getByTestId("contador-carrito")).toHaveTextContent("3");
    expect(await screen.findByText(MAXIMO)).toBeInTheDocument();
  });

  it("7. El botón + del carrito no supera el stock y muestra toast", async () => {
    const user = montar();
    await agregar(user, "Panela orgánica 1 kg", 3);
    const panel = await abrirCarrito(user);
    await user.click(panel.getByRole("button", { name: /Aumentar cantidad de Panela/ }));
    expect(panel.getByRole("spinbutton")).toHaveValue(3);
    expect(await screen.findByText(MAXIMO)).toBeInTheDocument();
  });

  it("8. El botón − con cantidad 1 pregunta y, al confirmar, elimina y recalcula", async () => {
    const user = montar();
    await agregar(user, "Café de Huila 500 g");
    const panel = await abrirCarrito(user);
    await user.click(panel.getByRole("button", { name: /Disminuir cantidad de Café/ }));
    expect(await screen.findByText(/¿Desea eliminar/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Sí, eliminar" }));
    expect(panel.getByText(/Tu carrito está vacío/)).toBeInTheDocument();
    expect(panel.getByTestId("total-compra")).toHaveTextContent("$0");
  });

  it("9. Agregar dos veces el mismo producto deja una sola línea", async () => {
    const user = montar();
    await agregar(user, "Café de Huila 500 g");
    await agregar(user, "Café de Huila 500 g");
    const panel = await abrirCarrito(user);
    expect(panel.getAllByRole("listitem")).toHaveLength(1);
    expect(panel.getByRole("spinbutton")).toHaveValue(2);
  });

  it("10. Café ×2, Panela ×3 y Arepa ×1: subtotales y total correctos", async () => {
    const user = montar();
    await agregar(user, "Café de Huila 500 g", 2);
    await agregar(user, "Panela orgánica 1 kg", 3);
    await agregar(user, "Arepa de choclo x6", 1);
    const panel = await abrirCarrito(user);
    expect(panel.getByText("$57.000")).toBeInTheDocument();
    expect(panel.getByText("$29.400")).toBeInTheDocument();
    expect(panel.getByText("$12.000")).toBeInTheDocument();
    expect(panel.getByTestId("total-compra")).toHaveTextContent("$98.400");
    expect(panel.getByTestId("total-unidades")).toHaveTextContent("6");
  });

  it("11. Al agregar todo el stock, el botón Agregar queda deshabilitado", async () => {
    const user = montar();
    await agregar(user, "Chocolate de mesa", 1);
    expect(tarjeta("Chocolate de mesa").getByRole("button", { name: /Sin stock/ })).toBeDisabled();
  });

  it("12. El ícono del carrito está a la derecha con la suma de unidades", async () => {
    const user = montar();
    await agregar(user, "Café de Huila 500 g", 2);
    await agregar(user, "Bocadillo veleño", 4);
    const boton = screen.getByRole("button", { name: /Abrir carrito/ });
    expect(screen.getByRole("navigation").lastElementChild).toBe(boton);
    expect(screen.getByTestId("contador-carrito")).toHaveTextContent("6");
  });
});

describe("Integración con el backend (API simulada)", () => {
  it("Finalizar compra envía el pedido, vacía el carrito y confirma", async () => {
    crearPedido.mockResolvedValue({ id: 7, total: 57000 });
    const user = montar();
    await agregar(user, "Café de Huila 500 g", 2);
    const panel = await abrirCarrito(user);
    await user.click(panel.getByRole("button", { name: "Finalizar compra" }));
    expect(crearPedido).toHaveBeenCalledWith([{ id: 1, cantidad: 2 }]);
    expect(await screen.findByText("Pedido #7 confirmado. Total: $57.000")).toBeInTheDocument();
    expect(screen.queryByTestId("contador-carrito")).not.toBeInTheDocument();
  });

  it("Si el backend rechaza el pedido, muestra el error y conserva el carrito", async () => {
    crearPedido.mockRejectedValue(new Error("Pedido inválido: sin stock"));
    const user = montar();
    await agregar(user, "Café de Huila 500 g", 2);
    const panel = await abrirCarrito(user);
    await user.click(panel.getByRole("button", { name: "Finalizar compra" }));
    expect(await screen.findByText("Pedido inválido: sin stock")).toBeInTheDocument();
    expect(screen.getByTestId("contador-carrito")).toHaveTextContent("2");
  });
});
