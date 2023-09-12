import { createSlice } from "@reduxjs/toolkit";
const billSlice = createSlice({
    name: 'billSlice',
    initialState: {
        bill: []
    },
    reducers: {
        setBill: (state, action) => {
            state.bill = action.payload
        },
        addbill: (state, action) => {
            state.bill.push(action.payload)
        }
    }
})

export const { setBill, addbill } = billSlice.actions
export default billSlice.reducer