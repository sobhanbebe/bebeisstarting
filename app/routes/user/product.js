const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");
const statusCodes = require("../../values/statusCodes");

router.get("/", async (req, res) => {
  try {
    const allProducts = await models.Product.find({}).populate("category");
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  console.log(productId.length);
  //TODO Validate object id
  try {
    mongoose.Types.ObjectId.isValid(productId);
    const product = await models.Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// search product by name
router.get("/s/:productName", async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.productName), "gi");
    const foundedProducts = await models.Product.find({ name: regex });
    res.status(200).json(foundedProducts);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCode.ER_SMT_WRONG });
  }
});

module.exports = router;
