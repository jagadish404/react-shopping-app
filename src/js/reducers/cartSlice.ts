import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../components/Product";

interface CartState {
  entities: ProductData[];
  count: number;
}

const initialState: CartState = {
  entities: [],
  count: 0,
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      console.log("state", state);
      state.entities.push(action.payload);
      state.count += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart } = counterSlice.actions;

export default counterSlice.reducer;
