import React from "react";

import ProductsList from "./ProductsList";
import productData from "../../../public/data/products.json";
import { render, screen, fireEvent, waitFor } from "../utils/test-utils";
import { describe, it, expect, beforeEach, vi, afterAll } from "vitest";

// Mock fetch globally
const globalFetch = globalThis.fetch;
globalThis.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  globalThis.fetch = globalFetch;
});

describe("Test suite for ProductsList component", () => {
  it("Should render ProductsList component with error in fetching", async () => {
    (globalThis.fetch as any).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<ProductsList />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    expect(screen.getByText("Loading products..")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Error while fetching data!!/i)).toBeInTheDocument();
    });
  });

  it("Should render ProductsList component with products list", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
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
