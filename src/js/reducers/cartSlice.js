import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
  count: 0,
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.entities.push(action.payload);
      state.count += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart } = counterSlice.actions;

export default counterSlice.reducer;
