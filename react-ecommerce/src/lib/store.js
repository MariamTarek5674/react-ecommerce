import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";
export let store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});
