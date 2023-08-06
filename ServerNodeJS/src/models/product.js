const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Product = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    image: { type: String },
    description: { type: String },
    category: { type: ObjectId, ref: "category" },
    status: { type: Number },
    createAt: { type: Date, default: Date.now() },
})


module.exports = mongoose.models.product || mongoose.model('product', Product)