const userSchema = require("../models/user");

const getCarts = async (idUser) => {

    let response = {
        status: true,
        message: "Lấy danh sách gio hang thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser).populate('cart.product', 'name image mass');
        if (!user) {
            throw new Error("User not found")
        }
        const cart = await user.cart;
        return { ...response, data: cart }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}


const addCart = async (idUser, idProduct, quantity) => {
    let response = {
        status: true,
        message: "Add gio hang thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser)
        if (!user) {
            throw new Error("User not found")
        }
        const cartItem = user.cart.find((item) => item.product === idProduct)

        if (quantity) {
            console.log("quantity: " + quantity);
            if (cartItem) {
                const updateQuantity = cartItem.quantity += Number(quantity);
                await user.save();
                return { ...response, data: cartItem, message: "Increase quantity : " + updateQuantity }
            }
            const cartObj = {
                product: idProduct,
                quantity: Number(quantity),
            }
            user.cart.push(cartObj);
        }
        else {
            if (cartItem) {
                const updateQuantity = cartItem.quantity += 1;
                await user.save();
                return { ...response, data: cartItem, message: "Increase quantity : " + updateQuantity }
            }
            const cartObj = {
                product: idProduct,
                quantity: 1,
            }
            user.cart.push(cartObj);

        }
        await user.save();
        return { ...response, data: user.cart }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}


const removeCart = async (idUser, idProduct) => {
    let response = {
        status: true,
        message: "Xóa sản phẩm gio hang thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) {
            throw new Error("User not found")
        }
        const cartItem = user.cart.find((item) => item.product === idProduct)
        if (!cartItem) {
            throw new Error("Product cart not found")
        }
        const indexCartItem = user.cart.indexOf(cartItem)
        const removeCartItem = user.cart.splice(indexCartItem, 1);
        await user.save();
        return { ...response, data: removeCartItem }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}

module.exports = {
    getCarts, addCart, removeCart
}