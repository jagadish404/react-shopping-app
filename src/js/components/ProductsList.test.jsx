import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ProductsList from "./ProductsList";
import productsReducer from "../reducers/productSlice";
import cartReducer from "../reducers/cartSlice";
import filterReducer from "../reducers/filterSlice";
import productData from "../../../public/data/products.json";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filterReducer,
  },
});

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test suite for ProductsList component", () => {
  it("Should render ProductsList component with products list", async () => {
    fetch.mockResponseOnce(JSON.stringify(productData));
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <ProductsList />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    const nutriwellProducts = await screen.findAllByText(/NutriWell Barley/i);
    expect(nutriwellProducts[0]).toBeInTheDocument();
    expect(nutriwellProducts.length).toEqual(2);
  });

  it("Should render ProductsList component with error in fetching", async () => {
    fetch.mockReject(() => "Network error.");
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <ProductsList />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    expect(await screen.findByText(/Error while fetching data!!/i)).toBeInTheDocument();
  });
});
