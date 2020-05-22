const mongoose = require("mongoose");

const Admin = mongoose.Schema({
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  token: [{ type: String }],
});

module.exports = mongoose.model("Admin", Admin);
