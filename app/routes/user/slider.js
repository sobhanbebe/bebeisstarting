const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");
const statusCodes = require("../../values/statusCodes");

//Get all banners
router.get("/", async (req, res) => {
  try {
    const allSliders = await models.Slider.find({}).populate("parent");
    res.status(200).json(allSliders);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

router.get("/:sliderId", async (req, res) => {
  const sliderId = req.params.sliderId;
  console.log(sliderId.length);
  //TODO Validate object id
  try {
    mongoose.Types.ObjectId.isValid(sliderId);
    const sliderId = await models.Slider.findById(sliderId);
    res.status(200).json({ CODE: foundedSlider });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// add a new Slider             /category POST {BODY}
router.post("/", async (req, res) => {
  const { image, parent, parentType } = req.body;
  try {
    const postedImg = await models.Slider({ image, parent, parentType }).save();
    console.log(postedImg);

    res.status(201).json({ CODE: statusCodes.DL_SLIDER });
  } catch (error) {
    console.log({ error: error.message });
    if (error.message.includes("require"))
      res.status(500).json({ CODE: statusCode.ER_PARAMS });
    else res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//update banner by id            /category/:categoryId  {body}
router.put("/:sliderId", async (req, res) => {
  const sliderId = req.params.sliderId;
  try {
    mongoose.Types.ObjectId.isValid(sliderId);

    // check id in database
    const foundedSlider = await models.Slider.findById(sliderId);
    if (!foundedSlider)
      return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    const { fieldChange, newValue } = req.body;
    const update = {};
    update[fieldChange] = newValue;
    await models.Slider.findByIdAndUpdate(sliderId, update);
    res.status(200).json({ CODE: statusCodes.UP_SLIDER });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//delete a banner by id          /banner/:bannerId
router.delete("/:sliderId", async (req, res) => {
  const sliderId = req.params.sliderId;
  try {
    mongoose.Types.ObjectId.isValid(sliderId);
    // check id in database
    const foundedSlider = await models.Slider.findById(sliderId);
    if (!foundedSlider)
      return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    await models.Slider.findByIdAndDelete(sliderId);
    res.status(200).json({ CODE: statusCodes.DL_SLIDER });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
