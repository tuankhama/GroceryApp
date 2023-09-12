const productSchema = require("../models/product");
const userSchema = require("../models/user");

const getCarts = async (idUser) => {

    let response = {
        status: true,
        message: "Lấy danh sách gio hang thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser)
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
        const products = await productSchema.findById(idProduct, "name image mass price");
        const cartItem = user.cart.find((item) => item.product._id == idProduct)
        if (quantity) {
            if (cartItem) {
                const updateQuantity = cartItem.quantity += Number(quantity);
                await user.save();
                return { ...response, data: cartItem, message: "Increase quantity : " + updateQuantity }
            }
            const cartObj = {
                product: products,
                quantity: Number(quantity),
            }
            user.cart.push(cartObj);
            await user.save();
            return { ...response, data: cartObj }
        }
        else {
            if (cartItem) {
                const updateQuantity = cartItem.quantity += 1;
                await user.save();
                return { ...response, data: cartItem, message: "Increase quantity : " + updateQuantity }
            }
            const cartObj = {
                product: products,
                quantity: 1,
            }
            user.cart.push(cartObj);
            await user.save();
            return { ...response, data: cartObj }
        }



    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}


const removeCart = async (idUser, idProduct) => {
    let response = {
        status: true,
        message: "Xóa sản phẩm giỏ h thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) {
            throw new Error("User not found")
        }
        const cartItem = user.cart.find((item) => item.product._id == idProduct)
        console.log(cartItem);
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





const increaseQuantity = async (idUser, idProduct) => {
    let response = {
        status: true,
        message: "Tang so luong thanh cong thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) {
            throw new Error("User not found")
        }
        const cartItem = user.cart.find((item) => item.product._id == idProduct)
        if (!cartItem) {
            throw new Error("Product cart not found")
        }
        const result = cartItem.quantity += 1;
        await user.save();
        return { ...response, data: result }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}


const decreaseQuantity = async (idUser, idProduct) => {
    let response = {
        status: true,
        message: "Giam so luong thanh cong thành công",
        data: null,
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) {
            throw new Error("User not found")
        }
        const cartItem = user.cart.find((item) => item.product._id == idProduct)
        if (!cartItem) {
            throw new Error("Product cart not found")
        }
        const result = cartItem.quantity -= 1;
        await user.save();
        return { ...response, data: result }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}

module.exports = {
    getCarts, addCart, removeCart, increaseQuantity, decreaseQuantity
}