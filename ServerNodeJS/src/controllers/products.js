const productSchema = require('../models/product');

const getAllProduct = async () => {
    try {
        const products = await productSchema.find({});
        return {
            status: true,
            message: "Lấy danh sách san pham thành công",
            data: products
        }
    } catch (error) {
        return {
            status: true,
            message: "Lấy danh sách san pham thất bại",
            data: null,
        }
    }
}


const getProductByIdCate = async (idCate) => {
    try {
        const products = await productSchema.find({ category: idCate }, "name price mass image")
        return {
            status: true,
            message: "Lấy danh sách san pham thành công",
            data: products
        }
    } catch (error) {
        return {
            status: true,
            message: "Lấy danh sách san pham thất bại",
            data: null,
        }
    }
}

const getDetailProduct = async (idProduct) => {
    try {
        const products = await productSchema.findById(idProduct);
        return {
            status: true,
            message: "Lấy detail thành công",
            data: products
        }
    } catch (error) {
        return {
            status: true,
            message: "Lấy detail thất bại",
            data: null,
        }
    }
}



const updateQuantity = async (idProduct, quantity) => {
    try {
        const product = await productSchema.findById(idProduct);
        product.quantity -= quantity;
        await product.save();
    } catch (error) {

    }
}

module.exports = {
    getAllProduct, getProductByIdCate, updateQuantity, getDetailProduct
}