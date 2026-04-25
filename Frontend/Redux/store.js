import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js";
import productReducer from "./Slices/productsSlice.js";
import cartReducer from "./Slices/cartSlice.js";
import cehckoutReducer from "./Slices/checkoutSlice";
import orderReducer from "./Slices/orderSlice.js";
import adminReducer from "./Slices/adminSlice";
import adminProductReducer from "./Slices/adminProductSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: cehckoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
  },
});

export default store;
