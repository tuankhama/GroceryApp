// productDetailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        data: "",
        isLoading: false,
    },
    reducers: {
        setProductDetail: (state, action) => {
            state.data = action.payload
            state.isLoading = false
        },
        detailSuccess: (state, action) => {
            state.isLoading = true
        }
    },
});

export const { setProductDetail, detailSuccess } = productDetailSlice.actions;
export default productDetailSlice.reducer;
