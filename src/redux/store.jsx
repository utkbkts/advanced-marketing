import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./cartSlice";
import AuthReducer from "./AuthSlice";
export const store = configureStore({
    reducer:{
        cart:CartReducer,
        auth:AuthReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false
    })
})