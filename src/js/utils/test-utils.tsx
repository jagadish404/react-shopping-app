import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer from "../reducers/productSlice";
import cartReducer from "../reducers/cartSlice";
import filterReducer from "../reducers/filterSlice";

// Define the root state type
export type RootState = {
  products: ReturnType<typeof productsReducer>;
  cart: ReturnType<typeof cartReducer>;
  filters: ReturnType<typeof filterReducer>;
};

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore>;
}

function render(
  ui: ReactElement,
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
  }: ExtendedRenderOptions = {}
) {
  // Set the initial route
  if (route !== "/") {
    window.history.pushState({}, "Test Page", route);
  }

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
