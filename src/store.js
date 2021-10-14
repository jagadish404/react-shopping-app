import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import productsReducer from "./js/reducers/productReducer";
import cartReducer from "./js/reducers/cartReducer";
import filterReducer from "./js/reducers/filterReducer";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filterReducer,
  },
  middleware: [logger, thunk],
});
