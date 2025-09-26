import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import productsReducer from "@/js/reducers/productSlice";
import cartReducer from "@/js/reducers/cartSlice";
import filterReducer from "@/js/reducers/filterSlice";
import { RootState } from "@/store";
import productData from "../../../public/data/products.json";

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

const preloadedData: PreloadedState<RootState> = {
  products: {
    entities: productData.products,
    status: "fulfilled",
  },
  cart: {
    entities: [],
    count: 0,
  },
  filters: {
    entities: [],
    selected: {},
  },
};
function render(
  ui: ReactElement,
  {
    route = "/",
    preloadedState = preloadedData,
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
    const content = (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );

    return content;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
