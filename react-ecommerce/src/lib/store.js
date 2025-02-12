import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

export let store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    auth: authSlice
  },
});
