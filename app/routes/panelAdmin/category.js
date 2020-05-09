const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../../models");

//  Get all category               /category GET
router.get("/", async (req, res) => {
  try {
    const allCategories = await models.Category.find({});
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ CODE: 1021 });
  }
});

// get category by id              /category/:categoryId
router.get("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  console.log(categoryId.length);
  //TODO Validate object id
  try {
    mongoose.Types.ObjectId.isValid(categoryId);
    const category = await models.Category.findById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: 1020 });
  }
});

// add a new category              /category POST {BODY}
router.post("/", async (req, res) => {
  const { name, image } = req.body;
  if ((!name, !image)) return res.status(400).json({ CODE: 1021 });
  //TODO : check url is our server
  try {
    await models.Category({ name, image }).save();
    res.status(201).json({ CODE: 2012 });
  } catch (error) {
    res.status(500).json({ CODE: 1010 });
  }
});

//update category by id            /category/:categoryId  {body}
router.put("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    //  2-1 => whole data
    // const { name, image } = req.body;
    // if ((!name, !image)) throw new Error({ CODE: 1012 });
    // mongoose.Types.ObjectId.isValid(categoryId);
    // await models.Category.findByIdAndUpdate(categoryId, { name, image });
    // res.status(200).json({ CODE: 2052 });
    // //  2-2 => one field
    const { fieldChange, newValue } = req.body;
    const update = {};
    update[fieldChange] = newValue;
    await models.Category.findByIdAndUpdate(categoryId, update);
    res.status(200).json({ CODE: 2052 });
  } catch (error) {
    res.status(500).json({ CODE: 1012 });
  }
});

//delete a category by id          /category/:categoryId
router.delete('/:categoryId',async(req,res)=> {
  const categoryId = req.params.categoryId;
  try {
    mongoose.Types.ObjectId.isValid(categoryId);
  await models.Category.findByIdAndDelete(categoryId)
  res.status(204).json({CODE:2525});
  } catch (error) {
    res.status(500).json({CODE:2424});
  }
});

module.exports = router;
