const jwt = require("jsonwebtoken");
const configs = require("../values/configs");
const models = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log({ token });
    await models.User.findOne({ token: { $in: [token] } });
    const decoded = jwt.verify(token, configs.TOKEN_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
