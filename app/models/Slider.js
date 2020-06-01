const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate");

const Slider = mongoose.Schema({
    image: {type: String, require: true},
    parentType: {type:String , enum:["Product","Category"]},
    parent: {type:mongoose.Schema.Types.ObjectId, refPath:'parentType'}
});
mongoose.plugin(mongoosePaginate);
module.exports = mongoose.model('Slider', Slider);
