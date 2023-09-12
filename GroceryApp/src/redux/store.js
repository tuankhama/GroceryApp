import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import productSlice from "./home/productSlice";
import productDetailSlice from "./home/productDetailSlice";
import categorySlice from "./home/categorySlice";
import favoriteSlice from "./home/favoriteSlice";
import cartSlice from "./home/cartSlice";
import addressSlice from "./home/addressSlice";
import billSlice from "./home/billSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productSlice,
        productDetail: productDetailSlice,
        categories: categorySlice,
        favorite: favoriteSlice,
        cart: cartSlice,
        address: addressSlice,
        bill: billSlice,
    }
})

export default store;