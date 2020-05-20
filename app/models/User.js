const mongoose = require("mongoose");

const User = mongoose.Schema({
  phoneNumber: { type: String },
  name: { type: String },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      count: { type: Number },
    },
  ],
  email: { type: String },
  token: [{ type: String }],
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", User);
