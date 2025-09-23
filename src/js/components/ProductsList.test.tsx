import React from "react";
import { render, screen, fireEvent } from "../utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";

import ProductsList from "./ProductsList";
import productData from "../../../public/data/products.json";

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Test suite for ProductsList component", () => {
  it("Should render ProductsList component with error in fetching", async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error("Network error."));

    render(<ProductsList />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    expect(await screen.findByText(/Error while fetching data!!/i)).toBeInTheDocument();
  });

  it("Should render ProductsList component with products list", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => productData,
    });

    render(<ProductsList />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();
    const nutriwellProducts = await screen.findAllByText(/NutriWell Barley/i);
    expect(nutriwellProducts[0]).toBeInTheDocument();
    expect(nutriwellProducts.length).toEqual(2);
  });
});
