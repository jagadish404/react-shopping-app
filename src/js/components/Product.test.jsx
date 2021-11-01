import React from "react";
import { render, screen, fireEvent } from "../utils/test-utils";

import ProductsList from "./ProductsList";
import productData from "../../../public/data/products.json";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test suite for Products component", () => {
  it("Should add item to cart and increase the count of items by 1", async () => {
    fetch.mockResponseOnce(JSON.stringify(productData));
    render(<ProductsList />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    const addToCartButtons = await screen.findAllByText(/Add To Cart/i);
    fireEvent.click(addToCartButtons[0]);
    expect(screen.getByTestId("cart-button").textContent).toEqual("Cart (1)");
    fireEvent.click(addToCartButtons[0]);
    expect(screen.getByTestId("cart-button").textContent).toEqual("Cart (2)");
  });
});
