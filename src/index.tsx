import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./css/index.css";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
