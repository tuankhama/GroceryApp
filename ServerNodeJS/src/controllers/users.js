const { Types } = require('mongoose');
const userSchema = require('../models/user');
const bcrypt = require('bcryptjs');

const registerUser = async (name, email, password) => {
    let respone = {
        status: true,
        message: "Đăng ký thành công",
        data: null
    }
    try {
        const salt = bcrypt.genSaltSync(10) // ma hoa 10 lan
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await new userSchema({
            email: email,
            name: name,
            password: hashPassword
        })
        const check = await userSchema.findOne({ email })
        if (check) {
            throw new Error("Email này đã được đăng ký")
        }
        const result = await user.save();
        return { ...respone, data: result }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }

};


const loginUser = async (email, password) => {
    let respone = {
        status: true,
        message: "Đăng nhập thành công",
        data: null
    }

    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            throw new Error("Email chưa được đăng ký")
        }
        // so sanh pass
        const check = bcrypt.compareSync(password, user.password);
        if (!check) {
            throw new Error("Mật khẩu không chính xác")
        }
        return { ...respone, data: user }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }

};


const changePasword = async (idUser, oldpass, newpass) => {
    let respone = {
        status: true,
        message: "Đổi mật khẩu thành công",
        data: null
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) {
            throw new Error("User không tồn tại")
        }
        const check = bcrypt.compareSync(oldpass, user.password);
        if (!check) {
            throw new Error("Mật khẩu hiện tại không chính xác")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newpass, salt);
        user.password = hashPassword;
        const result = await user.save();
        return { ...respone, data: result }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }
}

let nextId = 0;

// Hàm để lấy giá trị _id tiếp theo
function getNextId() {
    return nextId++;
}

const addAddress = async (idUser, name, phone, address, detailAddress) => {
    let respone = {
        status: true,
        message: "Thêm địa chỉ mới thành công",
        data: null
    }
    try {
        const user = await userSchema.findById(idUser);
        if (!user) throw new Error("User not found")
        const infoAddress = {
            _id: getNextId(),
            name: name,
            phone: phone,
            address: address,
            detailAddress: detailAddress
        }
        user.address.push(infoAddress);
        const result = await user.save();
        return { ...respone, data: infoAddress }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }
}


const editAddress = async (idUser, idAddress, name, phone, address, detailAddress) => {
    let response = {
        status: true,
        message: "Sửa địa chỉ thành công",
        data: null
    }

    try {
        const user = await userSchema.findById(idUser);

        if (!user) {
            throw new Error("User not found");
        }

        const selectedAddress = user.address.find(item => item._id == idAddress);

        if (!selectedAddress) {
            throw new Error("Address not found");
        }

        // Update fields if values are provided
        if (name) selectedAddress.name = name;
        if (phone) selectedAddress.phone = phone;
        if (address) selectedAddress.address = address;
        if (detailAddress) selectedAddress.detailAddress = detailAddress;

        // Save the user with the updated address
        const result = await user.save();

        // Log the updated data
        console.log("Updated user:", result);

        return { ...response, data: user.address };
    } catch (error) {
        console.error("Error in editAddress:", error);
        return { ...response, status: false, message: error.message };
    }
}



const removeAddress = async (idUser, idAddress) => {
    let respone = {
        status: true,
        message: "Xóa địa chỉ thành công",
        data: null
    }
    try {

        const user = await userSchema.findById(idUser);
        if (!user) throw new Error("User not found")
        const checkAddress = user.address.find(item => item._id == idAddress)
        if (!checkAddress) {
            throw new Error("Address not found")
        }
        const indexAddress = user.address.indexOf(checkAddress)
        user.address.splice(indexAddress, 1)
        const result = await user.save();
        return { ...respone, data: checkAddress }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }
}

const getDetailAddress = async (idUser, idAddress) => {
    let respone = {
        status: true,
        message: "Lấy địa chỉ thành công",
        data: null
    }
    try {

        const user = await userSchema.findById(idUser);
        if (!user) throw new Error("User not found")
        const address = user.address.filter(item => item._id == idAddress)
        console.log(address);
        return { ...respone, data: address }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }
}

const getAddress = async (idUser) => {
    let respone = {
        status: true,
        message: "Lấy địa chỉ thành công",
        data: null
    }
    try {

        const user = await userSchema.findById(idUser);
        if (!user) throw new Error("User not found")
        return { ...respone, data: user.address }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }
}

module.exports = {
    registerUser, loginUser, changePasword, getDetailAddress, addAddress, editAddress, removeAddress, getAddress
} 