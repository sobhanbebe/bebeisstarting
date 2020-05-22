const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate");
const Product = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  realPrice: { type: Number, required: true },
  weight: { type: Number, required: true },
  newPrice: { type: Number },
  unit: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});
mongoose.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', Product);
