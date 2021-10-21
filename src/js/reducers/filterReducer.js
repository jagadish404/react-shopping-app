import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./productReducer";

const initialState = {
  items: [],
  selected: [],
};

export const counterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    initializeFilter: (state, action) => {
      state.selected.items = action.payload;
    },
    selectFilter: (state, action) => {
      const index = state.selected.findIndex(
        ({ type, value }) => type === action.payload.type && value === action.payload.value
      );
      if (index !== -1) {
        state.selected.splice(index, 1);
      } else {
        state.selected.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload.filters;
    });
  },
});

// Action creators are generated for each case reducer function
export const { selectFilter, initializeFilter } = counterSlice.actions;

export default counterSlice.reducer;
