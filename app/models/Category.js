const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Category = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, require: true },
});

mongoose.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", Category);
