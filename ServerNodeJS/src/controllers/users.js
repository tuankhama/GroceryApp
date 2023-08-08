const userSchema = require('../models/user');
const bcrypt = require('bcryptjs');

const registerUser = async (name, email, password) => {
    let respone = {
        status: true,
        message: "Register ok",
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
            throw new Error("Email da ton tai")
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
        message: "Login ok",
        data: null
    }
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            throw new Error("Email chua duoc dang ky")
        }
        // so sanh pass
        const check = bcrypt.compareSync(password, user.password);
        if (!check) {
            throw new Error("Password sai")
        }
        return { ...respone, data: user }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }

};


const changePasword = async (idUser, newpass) => {
    let respone = {
        status: true,
        message: "change ok",
        data: null
    }
    try {
        const user = await userSchema.findById(idUser);
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newpass, salt);
        user.password = hashPassword;
        const result = await user.save();
        return { ...respone, data: result }
    } catch (error) {
        return { ...respone, status: false, message: error.message }
    }
}



module.exports = {
    registerUser, loginUser, changePasword
} 