const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");
const statusCodes = require("../../values/statusCodes");
const middleware = require("../../middleware");

router.post("/", middleware.userAuthentication, async (req, res) => {
  const { count, productId } = req.body;
  console.log(req.body);
  console.log(req.userData)

  
  try {
    const isValid = mongoose.Types.ObjectId.isValid(productId);
    console.log(isValid);

    await models.User.findOneAndUpdate(
      { _id: userId },
      { $push: { cart: { product: productId, count } } }
    );

    // check id in database
    console.log(productId);
    res.status(200).json({ CODE: statusCodes.AD_TO_CART });
  } catch (error) {
    console.log(error);
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});
module.exports = router;
