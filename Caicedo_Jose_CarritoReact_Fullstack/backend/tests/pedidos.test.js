import { test, beforeEach, before, after } from "node:test";
import assert from "node:assert/strict";
import { crearApp } from "../src/app.js";
import { pedidosStore } from "../src/data/pedidos.store.js";

let servidor;
let base;

before(async () => {
  servidor = crearApp().listen(0);
  await new Promise((r) => servidor.once("listening", r));
  base = `http://localhost:${servidor.address().port}/api`;
});
after(() => servidor.close());
beforeEach(() => pedidosStore.reiniciar());

const post = (body) =>
  fetch(`${base}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("GET /salud responde ok", async () => {
  const res = await fetch(`${base}/salud`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).estado, "ok");
});

test("caso 10: Café ×2, Panela ×3, Arepa ×1 => total $98.400", async () => {
  const res = await post({ items: [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 3 }, { id: 3, cantidad: 1 }] });
  assert.equal(res.status, 201);
  const { pedido } = await res.json();
  assert.deepEqual(pedido.lineas.map((l) => l.subtotal), [57000, 29400, 12000]);
  assert.equal(pedido.total, 98400);
  assert.equal(pedido.totalUnidades, 6);
});

test("caso 5: cantidad mayor al stock (999 con stock 8) se rechaza", async () => {
  const res = await post({ items: [{ id: 1, cantidad: 999 }] });
  assert.equal(res.status, 422);
  const { error } = await res.json();
  assert.match(error.detalles[0], /máximo de producto disponible en stock/);
});

test("rechaza 0, negativos, decimales y textos como cantidad", async () => {
  for (const cantidad of [0, -5, 1.5, "3e2", "abc", null]) {
    const res = await post({ items: [{ id: 1, cantidad }] });
    assert.equal(res.status, 422, `cantidad ${JSON.stringify(cantidad)} debería rechazarse`);
  }
});

test("rechaza producto inexistente, repetido y pedido vacío", async () => {
  assert.equal((await post({ items: [{ id: 99, cantidad: 1 }] })).status, 422);
  assert.equal((await post({ items: [{ id: 1, cantidad: 1 }, { id: 1, cantidad: 1 }] })).status, 422);
  assert.equal((await post({ items: [] })).status, 400);
  assert.equal((await post({})).status, 400);
});

test("JSON inválido responde 400 y ruta desconocida 404", async () => {
  assert.equal((await post("{ esto no es json")).status, 400);
  assert.equal((await fetch(`${base}/no-existe`)).status, 404);
});

test("ignora precios enviados por el cliente (el servidor recalcula)", async () => {
  const res = await post({ items: [{ id: 4, cantidad: 1, precio: 1 }] });
  assert.equal((await res.json()).pedido.total, 15400);
});

test("GET /pedidos lista los pedidos guardados en memoria", async () => {
  await post({ items: [{ id: 5, cantidad: 2 }] });
  const { pedidos } = await (await fetch(`${base}/pedidos`)).json();
  assert.equal(pedidos.length, 1);
  assert.equal(pedidos[0].total, 13000);
});
