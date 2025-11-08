import {configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/students/studentSlice"
import resultReducer from "../features/students/resultSlice";

export const store = configureStore({
    reducer : {
        students : studentReducer,
        results :resultReducer
    }
})
