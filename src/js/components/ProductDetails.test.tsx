import { render, screen } from "../utils/test-utils";
import { describe, it, expect, vi } from "vitest";

import productData from "../../../public/data/products.json";
import ProductDetails from "./ProductDetails";

const mockUseParams = vi.fn();
vi.mock("react-router-dom", async (importActual) => {
  const actual = (await importActual()) as typeof import("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(() => mockUseParams()),
  };
});

describe("Test suite for ProductDetails component", () => {
  it("Should render ProductDetails component with error in fetching", async () => {
    mockUseParams.mockReturnValue({ productIndex: "" });
    render(<ProductDetails />, { route: "/ProductDetails/0" });

    expect(await screen.findByText(/Error fetching product details!/i)).toBeInTheDocument();
  });

  it("Should render ProductDetails component with products list", async () => {
    mockUseParams.mockReturnValue({ productIndex: "0" });
    render(<ProductDetails />);

    expect(await screen.findByText(productData.products[0].name)).toBeInTheDocument();
    expect(screen.getByText(productData.products[0].desc)).toBeInTheDocument();
  });
});
