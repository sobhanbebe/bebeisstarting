const mongoose = require('mongoose');

const Banner = mongoose.Schema({
  image: { type: String, required: true },
  parentType: { type: String, enum: ['Product', 'Category'], required: true },
  "category": {
    "_id": "5eb696c068b0245c6f66bd3c",
    "name": "mast",
    "image": "https://picsum.photos/500/800",
    "__v": 0
},: { type: mongoose.Schema.Types.ObjectId, refPath: 'parentType', required: true },
});

module.exports = mongoose.model('Banner', Banner);
