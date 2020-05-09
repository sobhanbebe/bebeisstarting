const mongoose = require('mongoose');
const Product = mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  realPrice: { type: Number, required: true },
  weight: { type: Number, required: true },
  newPrice: { type: Number },
  unit: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Product', Product);
