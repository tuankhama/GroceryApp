const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const Category = new Schema({
    name: { type: String },
    image: { type: String }
});


module.exports = mongoose.models.category || mongoose.model("category", Category)