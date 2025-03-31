import { configureStore } from "@reduxjs/toolkit";
import authService from "../appWrite/auth";
import authSlice from "./AuthSlice";
import PostSlice from "./PostSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: PostSlice,
    },
});

export default store;
