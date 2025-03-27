import { configureStore } from "@reduxjs/toolkit";
import authService from "../appWrite/auth";
import authSlice from "./AuthSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export default store;
