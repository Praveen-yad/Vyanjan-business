import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./ToggleSlice";

const store = configureStore({
    reducer:{
        toggle:toggleSlice
    }
})

export default store