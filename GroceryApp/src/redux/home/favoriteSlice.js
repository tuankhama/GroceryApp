import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name: 'favoriteSlice',
    initialState: {
        favorite: "",
        isLoading: false,
    },
    reducers: {
        pending: (state, action) => {
            state.isLoading = true;
        },
        setFavorite: (state, action) => {
            state.isLoading = false;
            state.favorite = action.payload

        },
        updateFavorite: (state, action) => {
            state.isLoading = false;
            state.favorite.push(action.payload)

        },
        deleteFavorite: (state, action) => {
            state.isLoading = false;
            const idToRemove = action.payload
            state.favorite = state.favorite.filter(item => item._id !== idToRemove)
        }
    }
})


export const { setFavorite, updateFavorite, deleteFavorite, pending } = favoriteSlice.actions
export default favoriteSlice.reducer;

