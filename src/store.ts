import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import productsReducer from "./js/reducers/productSlice";
import cartReducer from "./js/reducers/cartSlice";
import filterReducer from "./js/reducers/filterSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: {},
});

export default store;

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
