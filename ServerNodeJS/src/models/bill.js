const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Bill = new Schema({
    idUser: { type: String },
    billItem: [
        {
            product: { type: Object },
            quantity: { type: Number }
        }
    ],
    address: { type: String },
    phone: { type: String },
    name: { type: String },
    payment: { type: String },
    status: { type: Number, default: 1 },
    nameBill: { type: Number },
    createAt: { type: Date, default: Date.now() }
})


module.exports = mongoose.models.bill || mongoose.model('bill', Bill)