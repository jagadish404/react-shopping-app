import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductData, ProductsResponse } from "@/js/types";
import products from "@/data/products.json";

interface ProductSliceData {
  entities: ProductData[];
  status: "idle" | "pending" | "fulfilled" | "failed";
}

const initialState: ProductSliceData = {
  entities: [],
  status: "idle",
};

export const fetchData = createAsyncThunk("products/fetchData", async () => {
  // Mocking an async fetch with a timeout
  return new Promise<ProductsResponse>((resolve) => {
    setTimeout(() => {
      resolve(products as ProductsResponse);
    }, 1000);
  });
});

const filterProductsByPrice = (value: string, list: ProductData[]) => {
  let [priceRangeStart, priceRangeEnd] = value.split("-");
  let filteredProducts = list.filter(({ price }) => {
    return price >= priceRangeStart && price <= priceRangeEnd;
  });

  return filteredProducts;
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProductsBy: (state, action) => {
      let { type, value } = action.payload;
      let filteredProducts = [];

      if (type === "price") {
        filteredProducts = filterProductsByPrice(value, state.entities);
      } else if (type === "brand") {
        filteredProducts = state.entities.filter(({ brand }) => brand === value);
      } else {
        filteredProducts = state.entities;
      }

      state.entities = filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.entities = action.payload.products;
      state.status = "fulfilled";
    });
    builder.addCase(fetchData.pending, (state, _action) => {
      state.status = "pending";
    });
    builder.addCase(fetchData.rejected, (state, _action) => {
      state.status = "failed";
    });
  },
});

export const { filterProductsBy } = productSlice.actions;
export default productSlice.reducer;
