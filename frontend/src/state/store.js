import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "/src/state/Auth/Reducer.js";
import {sweetReducer} from "@/state/Sweet/Reducer.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sweet: sweetReducer
    },
});
export default store;