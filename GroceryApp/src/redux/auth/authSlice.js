
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import AxiosIntance from "../../utils/AxiosIntance";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
    },
    reducers: {
        loginStart: (state, action) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
        },
        logout: (state, action) => {
            state.user = null;
        }
    },

})

export const { loginSuccess, logout, loginStart, loginFailure } = authSlice.actions

export default authSlice.reducer;