const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Bill = new Schema({
    idUser: { type: String },
    billItem: [
        {
            product: { type: String, ref: 'product' },
            quantity: { type: Number }
        }
    ],
    address: { type: String },
    payment: { type: String },
    status: { type: Number, default: 1 },
})


module.exports = mongoose.models.bill || mongoose.model('bill', Bill)