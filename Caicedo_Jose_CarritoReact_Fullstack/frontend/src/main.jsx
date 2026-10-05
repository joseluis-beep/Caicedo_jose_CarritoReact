import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./context/ToastContext";
import { CarritoProvider } from "./context/CarritoContext";
import "./styles/variables.css";
import "./styles/base.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </ToastProvider>
  </StrictMode>
);
