import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";

const store = configureStore({
    reducer : {
        employee : employeeSlice,
    }
})

export default store;