import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js";
import productReducer from "./Slices/productsSlice.js";
import cartReducer from "./Slices/cartSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
