import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import productsReducer from "../reducers/productSlice";
import cartReducer from "../reducers/cartSlice";
import filterReducer from "../reducers/filterSlice";

function render(
  ui,
  {
    route = "/",
    preloadedState,
    store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
        filters: filterReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    const history = createMemoryHistory();
    window.history.pushState({}, "Home Page", route);
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
