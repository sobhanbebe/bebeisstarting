
const mongoose = require('mongoose');
const Product = mongoose.Schema({
    image: {type: String, require: true},
    name: { type: String, required: true },
    realPrice: { type: Number, required: true },
    weight:{type:Number,require:true},
    newPrice: {type: Number},
    unit:{type:String, require:true},
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}
});

module.exports = mongoose.model('Product', Product);