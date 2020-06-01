const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Banner = mongoose.Schema({
  image: { type: String, require: true },
  parentType: { type: String, enum: ["Product", "Category"] },
  parent: { type: mongoose.Schema.Types.ObjectId, refPath: "parentType" },
});

module.exports = mongoose.model("Banner", Banner);
mongoose.plugin(mongoosePaginate);