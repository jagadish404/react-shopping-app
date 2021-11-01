import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import productsReducer from "../reducers/productSlice";
import cartReducer from "../reducers/cartSlice";
import filterReducer from "../reducers/filterSlice";

function render(
  ui,
  {
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
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
