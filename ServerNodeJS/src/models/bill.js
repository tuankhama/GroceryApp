const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Bill = new Schema({
    detail: { type: String },
    address: { type: String },
    payment: { type: String },
    status: { type: Number },
})


module.exports = mongoose.models.bill || mongoose.model('bill', Bill)