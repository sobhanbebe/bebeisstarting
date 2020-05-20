const mongoose = require("mongoose");
const ttl = require("mongoose-ttl");

const Verification = mongoose.Schema({
  verificationCode: { type: String },
  phoneNumber: { type: String },
  createdAt: { type: Date, expires: '2m', default: Date.now }
},{timestamps: true});


module.exports = mongoose.model("Verification", Verification);

