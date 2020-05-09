const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const allProducts = await models.Product.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ CODE: 1021 });
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
    res.status(500).json({ CODE: 1020 });
  }
});

// add a new category              /category POST {BODY}
router.post("/", async (req, res) => {
  const { name, image, realPrice, weight, unit } = req.body;
  if ((!name, !image, !realPrice, !weight, !unit))
    return res.status(400).json({ CODE: 1021 });
  //TODO : check url is our server
  try {
    await models.Product({ name, image, realPrice, weight, unit }).save();
    res.status(201).json({ CODE: 2012 });
  } catch (error) {
    res.status(500).json({ CODE: 1010 });
  }
});

//update category by id            /category/:categoryId  {body}
router.put("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const { fieldChange, newValue } = req.body;
    const update = {};
    update[fieldChange] = newValue;
    await models.Product.findByIdAndUpdate(productId, update);
    res.status(200).json({ CODE: 2052 });
  } catch (error) {
    res.status(500).json({ CODE: 1012 });
  }
});

//delete a product by id          /category/:categoryId
router.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    mongoose.Types.ObjectId.isValid(productId);
    await models.Product.findByIdAndDelete(productId);
    res.status(204).json({ CODE: 2525 });
  } catch (error) {
    res.status(500).json({ CODE: 2424 });
  }
});

module.exports = router;


