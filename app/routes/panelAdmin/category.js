const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../../models");
const statusCodes = require("../../values/statusCodes");

const escapeRegex = (text) => {
  console.log({ text });
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//  Get all category               /category GET
router.get("/:page", async (req, res) => {
  const { page } = req.params;
  try {
    const allCategories = await models.Category.paginate(
      {},
      { page, limit: 10 }
    );
    res.status(200).json(allCategories);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

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

// add a new category              /category POST {BODY}
router.post("/", async (req, res) => {
  const { name, image } = req.body;
  if ((!name, !image)) return res.status(400).json({ CODE: 1021 });
  //TODO : check url is our server
  try {
    await models.Category({ name, image }).save();
    res.status(201).json({ CODE: statusCodes.AD_CATEGORY });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//update category by id            /category/:categoryId  {body}
router.put("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    // check valid id
    mongoose.Types.ObjectId.isValid(categoryId);

    // check id in database
    const foundedCategory = await models.Category.findById(categoryId);
    if (!foundedCategory)
      return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });

    const { fieldChange, newValue } = req.body;
    const update = {};
    update[fieldChange] = newValue;
    await models.Category.findByIdAndUpdate(categoryId, update);
    res.status(200).json({ CODE: statusCodes.UP_CATEGORY });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//delete a category by id          /category/:categoryId
router.delete("/:categoryId", async (req, res) => {
  // Check current id in database
  const categoryId = req.params.categoryId;
  try {
    mongoose.Types.ObjectId.isValid(categoryId);
    const foundedCategory = await models.Category.findById(categoryId);
    if (!foundedCategory)
      return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    await models.Category.findByIdAndDelete(categoryId);
    res.status(204).json({ CODE: statusCodes.DL_CATEGORY });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
