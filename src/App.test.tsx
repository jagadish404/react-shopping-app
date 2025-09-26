import React from "react";
import { render, screen, fireEvent, act } from "./js/utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";

import App from "./App";
import productData from "../public/data/products.json";

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe("Test suite for App component", () => {
  it("Should render ProductsList component by default", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => productData,
    });

    render(<App />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    // expect(screen.getByText("Loading products..")).toBeInTheDocument();
    const nutriwellProducts = await screen.findAllByText(/NutriWell Barley/i);
    expect(nutriwellProducts[0]).toBeInTheDocument();
  });

  it("Should render Cart Page component", async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<App />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText(/Cart/i));
    });
    expect(screen.queryByText("Products List")).not.toBeInTheDocument();
    expect(screen.getByText("No products added to cart!")).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText("React Store"));
    });
  });

  it("Should render Product Detail for NutriWell Barley product", async () => {
    const nutriWellBarleyProductDescription = /F&N NutriWell Barley is freshly brewed from a special home recipe/i;

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => productData,
    });

    render(<App />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    const productImages = await screen.findAllByTestId("product-image");
    act(() => {
      fireEvent.click(productImages[0]);
    });
    expect(screen.queryByText("Products List")).not.toBeInTheDocument();
    expect(screen.getByText("NutriWell Barley")).toBeInTheDocument();
    expect(screen.getByText(/2.25/i)).toBeInTheDocument();
    expect(screen.getByText(nutriWellBarleyProductDescription)).toBeInTheDocument();
  });
});
