import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "@/js/types";

interface CartState {
  items: {
    productId: number;
    product: ProductData;
    count: number;
  }[];
  totalCount: number;
}

const initialState: CartState = {
  items: [],
  totalCount: 0,
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      let existingItem = state.items.find((item) => item.productId === action.payload.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ productId: action.payload.id, product: action.payload, count: 1 });
      }
      state.totalCount += 1;
    },
    removeItemFromCart: (state, action) => {
      let existingItemIndex = state.items.findIndex((item) => item.productId === action.payload.id);
      if (existingItemIndex !== -1) {
        let existingItem = state.items[existingItemIndex];
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
        state.totalCount -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart, removeItemFromCart } = counterSlice.actions;

export default counterSlice.reducer;
