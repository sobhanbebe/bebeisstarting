const jwt = require("jsonwebtoken");
const configs = require("../values/configs");

module.exports = module.exports = async (phoneNumber) => {
  return jwt.sign({ phoneNumber }, configs.TOKEN_SECRET, {
    expiresIn: "9000h",
  });
};
