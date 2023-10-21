import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slices/index";

export const store = configureStore({
    reducer: rootReducer
})