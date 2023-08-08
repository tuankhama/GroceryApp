const userSchema = require('../models/user')
const getFavorites = async (idUser) => {

    let response = {
        status: true,
        message: "Lấy danh sách san pham yeeu thich thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser).populate('favorite',
            'name mass image'
        );
        if (!user) {
            throw new Error("User not found")
        }
        const favorites = await user.favorite;
        return { ...response, data: favorites }
    } catch (error) {
        return { ...response, status: false, message: error.message }

    }
}

const addFavorite = async (idUser, idProduct) => {
    let response = {
        status: true,
        message: "Add san pham yeeu thich thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) {
            throw new Error("User not found")
        }
        const favorite = user.favorite.find(item => item === idProduct)
        if (favorite) {
            throw new Error("Favorite da co trong list")
        }
        user.favorite.push(idProduct);
        const result = await user.save();
        return { ...response, data: result.favorite }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }

}

const deleteFavorite = async (idUser, idProduct) => {
    let response = {
        status: true,
        message: "Xoa san pham yeeu thich thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) {
            throw new Error("User not found")
        }
        const favorite = user.favorite.find(item => item === idProduct)
        if (!favorite) {
            throw new Error("Favorite not found")
        }
        const favoriteIndex = user.favorite.indexOf(favorite)
        user.favorite.splice(favoriteIndex, 1)
        const result = await user.save();
        return { ...response, data: result.favorite }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}




module.exports = {
    getFavorites, deleteFavorite, addFavorite
}