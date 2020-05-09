const mongoose = require('mongoose');

const Category = mongoose.Schema({
    name: { type: String, required: true },
    image:{type:String,require:true},
});

module.exports = mongoose.model('Category', Category);