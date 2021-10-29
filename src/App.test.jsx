import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import productsReducer from "./js/reducers/productSlice";
import cartReducer from "./js/reducers/cartSlice";
import filterReducer from "./js/reducers/filterSlice";
import productData from "../public/data/products.json";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filterReducer,
  },
});
const setup = (component) => (
  <Provider store={store}>
    <BrowserRouter>{component}</BrowserRouter>
  </Provider>
);

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test suite for App component", () => {
  it("Should render ProductsList component by default", async () => {
    fetch.mockResponseOnce(JSON.stringify(productData));
    render(setup(<App />));

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    const nutriwellProducts = await screen.findAllByText(/NutriWell Barley/i);
    expect(nutriwellProducts[0]).toBeInTheDocument();
  });

  it("Should render Cart Page component", async () => {
    fetch.mockReject(JSON.stringify(productData));
    render(setup(<App />));

    expect(screen.getByText("Products List")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cart"));
    expect(screen.queryByText("Products List")).not.toBeInTheDocument();
    expect(screen.getByText("No products added to cart!")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Browse"));
  });

  it("Should render Product Detail for NutriWell Barley product", async () => {
    fetch.mockResponseOnce(JSON.stringify(productData));
    render(setup(<App />));

    expect(screen.getByText("Products List")).toBeInTheDocument();
    const productImages = await screen.findAllByTestId("product-image");
    fireEvent.click(productImages[0]);
    expect(screen.queryByText("Products List")).not.toBeInTheDocument();
    expect(screen.getByText("NutriWell Barley")).toBeInTheDocument();
    expect(screen.getByText(/2.25/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /F&N NutriWell Barley is freshly brewed from a special home recipe using carefully selected pearl barley and dried winter melon strips. Barley, a grain full of pure goodness, is commonly used in home-brews, to make that familiar barley drink or in soups. All natural, with no added preservatives and reduced in sugar, F&N NutriWell Barley is the great-tasting, 'healthier-choice' convenient beverage to cool you down in this tropical climate. Make drinking F&N NutriWell a daily enjoyment./i
      )
    ).toBeInTheDocument();
  });
});
