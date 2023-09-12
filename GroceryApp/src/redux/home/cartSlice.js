import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cart: "",
        isLoading: false
    },
    reducers: {
        pendingCart: (state, action) => {
            state.isLoading = true
        },
        error: (state, action) => {
            state.isLoading = false

        },
        setCart: (state, action) => {
            state.cart = action.payload
            state.isLoading = false
        },
        updateCart: (state, action) => {
            const idProduct = action.payload.product._id
            const cartItem = state.cart.find((item) => item.product._id == idProduct)
            state.isLoading = false

            if (cartItem) {
                cartItem.quantity = action.payload.quantity
            } else {
                state.cart.push(action.payload)
            }

        },
        increaseQuantity: (state, action) => {
            const idProduct = action.payload
            const cartItem = state.cart.find((item) => item.product._id == idProduct)
            if (cartItem) {
                cartItem.quantity += 1
            }
        },
        decreaseQuantity: (state, action) => {
            const idProduct = action.payload
            const cartItem = state.cart.find((item) => item.product._id == idProduct)
            if (cartItem) {
                cartItem.quantity -= 1
            }
        },
        removeItemCart: (state, action) => {
            const idProduct = action.payload
            state.cart = state.cart.filter(item => item.product._id != idProduct)
            state.isLoading = false
        },
        removeCart: (state, action) => {
            state.cart = []
        }
    }
})



export const { setCart, removeCart, updateCart, pendingCart, removeItemCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer