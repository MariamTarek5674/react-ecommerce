import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";

export let store = configureStore({
  reducer: {
    products: productsSlice
  },
});
