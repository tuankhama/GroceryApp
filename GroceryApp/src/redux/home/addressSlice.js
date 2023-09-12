import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: 'addressSlice',
    initialState: {
        addresses: []
    },
    reducers: {
        setAddressData: (state, action) => {
            state.addresses = action.payload;
        },
        addAddress: (state, action) => {
            state.addresses.push(action.payload);
        },
        removeAddress: (state, action) => {
            const idAddress = action.payload;
            state.addresses = state.addresses.filter(item => item._id !== idAddress)
        },
        updateAddress: (state, action) => {
            const { idAddress, name, phone, address, detailAddress } = action.payload;
            const addressSeleted = state.addresses.find(item => item._id === idAddress)
            if (addressSeleted) {
                addressSeleted.name = name;
                addressSeleted.phone = phone;
                addressSeleted.address = address,
                    addressSeleted.detailAddress = detailAddress
            }
        }
    }
})


export const { setAddressData, addAddress, removeAddress, updateAddress } = addressSlice.actions

export default addressSlice.reducer
