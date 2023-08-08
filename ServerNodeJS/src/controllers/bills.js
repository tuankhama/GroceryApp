const billSchema = require('../models/bill');
const userSchema = require('../models/user');
const productController = require('../controllers/products');
const getBills = async (idUser) => {
    let response = {
        status: true,
        message: "Lấy danh sách bill thành công",
        data: null,
    }
    try {
        const bill = await billSchema.find({ idUser: idUser });
        if (!bill) {
            throw new Error("Bill not found")
        }
        return { ...response, data: bill }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}


const getBillDetail = async (idBill) => {
    let response = {
        status: true,
        message: "Lấy billdetail thành công",
        data: null,
    }
    try {
        const bill = await billSchema.findById(idBill)
        if (!bill) {
            throw new Error("Bill not found")
        }
        return { ...response, data: bill }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }
}


// status = 0 : cancel;
// status = 1 : da dat hang,
// status = 2 : da xac nhan,
// status = 3 : da giao hang,

const addBill = async (idUser, billItem, address, payment) => {
    let response = {
        status: true,
        message: "Insert bill thanh cong",
        data: null,
    }
    try {
        const cartItem = await userSchema.findById(idUser)
        const billItem = cartItem.cart;
        const bill = await new billSchema({
            idUser: idUser,
            billItem: billItem,
            address: address,
            payment: payment,
        })
        // cap nhat so luong san pham trong product
        for (const item of cartItem.cart) {
            await productController.updateQuantity(item.product, item.quantity)
        }
        // xoa gio hang cua user do
        cartItem.cart = [];
        await cartItem.save();
        const billAdd = await bill.save();
        return { ...response, data: billAdd }
    } catch (error) {
        return { ...response, status: false, message: error.message }
    }


}

const cannelBill = async (idBill) => {
    let response = {
        status: true,
        message: "Cannel bill ok"
    }
    try {
        const bill = await billSchema.findById(idBill);
        if (!bill) {
            throw new Error(`Cannel bill not found`);
        }
        if (bill.status !== 1) {
            throw new Error("Cannot cancel a bill with this status");
        }
        for (const item of bill.billItem) {
            await productController.updateQuantity(item.product, -item.quantity)
        }
        bill.status = 0;
        await bill.save();
        return response;
    } catch (error) {
        return {
            ...response, status: false, message: error.message
        }
    }
}



module.exports = {
    getBills, getBillDetail, addBill, cannelBill
}