import React from "react";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import productsReducer from "./js/reducers/productSlice";
import cartReducer from "./js/reducers/cartSlice";
import filterReducer from "./js/reducers/filterSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filterReducer,
  },
});
describe("Test suite for App component", () => {
  it("Should render App component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("React Shopping Cart")).toBeInTheDocument();
  });
});
