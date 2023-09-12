import { createSlice } from "@reduxjs/toolkit";


const categories = createSlice({
    name: 'category',
    initialState: {
        data: "",
        isLoading: false
    },
    reducers: {
        pendingCategory: (state, action) => {
            state.isLoading = true;
        },
        setCategories: (state, action) => {
            state.data = action.payload
            state.isLoading = false
        }
    }
})


export const { pendingCategory, setCategories } = categories.actions;
export default categories.reducer;