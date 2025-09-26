import { render, screen, fireEvent } from "../utils/test-utils";
import { describe, it, expect, vi } from "vitest";
import ReactRedux from "react-redux";

import Product from "./Product";
import productData from "../../../public/data/products.json";
const mockProduct = productData.products[0];
const mockDispatch = vi.fn();

vi.mock("react-redux", async (importActual) => {
  const actual = (await importActual()) as typeof ReactRedux;
  return {
    ...actual,
    useDispatch: vi.fn(() => mockDispatch),
  };
});

describe("Test suite for Products component", () => {
  it("Should render component with data provided by props", async () => {
    render(<Product productIndex={0} product={mockProduct} />);

    expect(screen.getByText(/NutriWell Barley/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2\.25/i)).toBeInTheDocument();
  });

  it("Should render add to cart button", async () => {
    render(<Product productIndex={0} product={mockProduct} />);

    expect(screen.getByRole("button", { name: /Add To Cart/i })).toBeInTheDocument();
  });

  it("Should show count in button when count is provided", async () => {
    render(<Product productIndex={0} product={mockProduct} count={2} />);

    expect(screen.getByRole("button", { name: /Add To Cart \(2\)/i })).toBeInTheDocument();
  });

  it("Should dispatch addItemToCart action when Add to Cart button is clicked", async () => {
    render(<Product productIndex={0} product={mockProduct} />);

    const addToCartButton = screen.getByRole("button", { name: /Add To Cart/i });

    // Click the Add to Cart button
    fireEvent.click(addToCartButton);

    // Verify the product was added to cart
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "cart/addItemToCart",
      payload: mockProduct,
    });
    mockDispatch.mockClear();
  });
});
