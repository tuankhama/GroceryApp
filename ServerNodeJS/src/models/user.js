const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: { type: String, require: true, unique: true },
    password: {
        type: String,
        require: true
    },
    phoneNumber: { type: String },
    country: { type: String },
    name: { type: String },
    address: [{
        _id: { type: Number },
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        detailAddress: { type: String },
    }],
    favorite: [{ type: String, ref: 'product' }],
    cart: [{
        product: { type: Object },
        quantity: { type: Number }
    }],
    status: { type: Number, default: 1, },
    createAt: { type: Date, default: Date.now() }
})


module.exports = mongoose.models.user || mongoose.model('user', User)