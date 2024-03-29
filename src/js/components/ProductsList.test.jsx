import React from "react";
import { render, screen, fireEvent } from "../utils/test-utils";
import { act } from "react-dom/test-utils";

import ProductsList from "./ProductsList";
import productData from "../../../public/data/products.json";

beforeEach(() => {
  fetch.resetMocks();
});

describe("Test suite for ProductsList component", () => {
  it("Should render ProductsList component with error in fetching", async () => {
    fetch.mockReject(() => "Network error.");
    render(<ProductsList />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    expect(await screen.findByText(/Error while fetching data!!/i)).toBeInTheDocument();
  });

  it("Should render ProductsList component with products list", async () => {
    fetch.mockResponseOnce(JSON.stringify(productData));
    render(<ProductsList />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    const nutriwellProducts = await screen.findAllByText(/NutriWell Barley/i);
    expect(nutriwellProducts[0]).toBeInTheDocument();
    expect(nutriwellProducts.length).toEqual(2);
  });
});
