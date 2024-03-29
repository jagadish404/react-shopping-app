import React from "react";
import { render, screen } from "../utils/test-utils";

import App from "../../App";
import productData from "../../../public/data/products.json";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test suite for ProductDetails component", () => {
  it("Should render ProductDetails component with error in fetching", async () => {
    render(<App />, { route: "/ProductDetails/0" });

    expect(await screen.findByText(/Error fetching product details!/i)).toBeInTheDocument();
  });

  it("Should render ProductDetails component with products list", async () => {
    const preloadedState = {
      products: {
        entities: productData.products,
        status: "idle",
      },
    };
    render(<App />, { preloadedState, route: "/ProductDetails/0" });

    expect(await screen.findByText(productData.products[0].name)).toBeInTheDocument();
    expect(screen.getByText(productData.products[0].desc)).toBeInTheDocument();
  });
});
