import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsList: [],
};

export const fetchData = createAsyncThunk("products/fetchData", async () => {
  const data = await fetch("./data/products.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const res = await data.json();
  return res;
});

const filterProductsByPrice = (value, list) => {
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
        filteredProducts = filterProductsByPrice(value, state.productsList);
      } else if (type === "brand") {
        filteredProducts = state.productsList.filter(({ brand }) => brand === value);
      } else {
        filteredProducts = state.productsList;
      }

      state.productsList = filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.productsList = action.payload.products;
    });
  },
});

export const { filterProductsBy } = productSlice.actions;
export default productSlice.reducer;
