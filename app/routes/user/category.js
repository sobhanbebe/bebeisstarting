const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");
const statusCodes = require("../../values/statusCodes");

router.get("/", async (req, res) => {
  try {
    const allCategories = await models.Category.find({});
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// get category by id              /category/:categoryId
router.get("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  console.log(categoryId.length);
  //TODO Validate object id
  try {
    mongoose.Types.ObjectId.isValid(categoryId);
    const allCategory = await models.Category.findById(categoryId);
    res.status(200).json(allCategory);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// search category by name
router.get("/s/:categoryName", async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.categoryName), "gi");
    const foundedCategory = await models.Category.find({ name: regex });
    res.status(200).json(foundedCategory);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
