import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./productSlice";

const initialState = {
  entities: [],
  selected: {},
};

export const counterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    selectFilter: (state, action) => {
      const { type: filterType, value: filterValue } = action.payload;
      const index = state.selected[filterType].findIndex((value) => value === filterValue);
      if (index !== -1) {
        state.selected[filterType].splice(index, 1);
      } else {
        state.selected[filterType].push(filterValue);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { filters } = action.payload;
      state.entities = action.payload.filters;

      if (filters.length) {
        filters.forEach(({ name }) => {
          state.selected[name] = [];
        });
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { selectFilter } = counterSlice.actions;

export default counterSlice.reducer;
