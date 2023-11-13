import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../Network/api";


export const Store = configureStore({
    reducer:{
        [postApi.reducerPath]: postApi.reducer,
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postApi.middleware)
})