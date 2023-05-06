import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name:'toggle',
    initialState: false,
    reducers:{
        change(state, action){
            return !state
        }
    }
})

export const { change } = toggleSlice.actions
export default toggleSlice.reducer