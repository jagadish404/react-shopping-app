import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToCart } = counterSlice.actions;

export default counterSlice.reducer;
