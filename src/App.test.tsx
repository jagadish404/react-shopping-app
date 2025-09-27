import { render, screen, fireEvent, act } from "./js/utils/test-utils";
import { describe, it, expect, beforeEach, vi, afterAll } from "vitest";

import App from "./App";
import productData from "../public/data/products.json";

// Mock fetch globally
const fetchSpy = vi.spyOn(globalThis, "fetch");

beforeEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("Test suite for App component", () => {
  it("Should render ProductsList component by default", async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => productData,
    } as Response);

    render(<App />);

    expect(screen.getByText("Products List")).toBeInTheDocument();
    const nutriwellProducts = await screen.findAllByText(/NutriWell Barley/i);
    expect(nutriwellProducts[0]).toBeInTheDocument();
  });

  it("Should render Cart Page component", async () => {
    fetchSpy.mockRejectedValueOnce(new Error("Failed to fetch"));

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

    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => productData,
    } as Response);

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
