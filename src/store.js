import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import productsReducer from "./js/reducers/productSlice";
import cartReducer from "./js/reducers/cartSlice";
import filterReducer from "./js/reducers/filterSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filterReducer,
  },
  middleware: [logger, thunk],
});
