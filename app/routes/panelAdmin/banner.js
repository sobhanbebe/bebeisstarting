const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");
const statusCodes = require("../../values/statusCodes");

//Get all banners

router.get("/:page", async (req, res) => {
  const { page } = req.params;
  try {
    const allBanners = await models.Banner.paginate(
      {},
      { page, limit: 10 }
      );
      res.status(200).json(allBanners);
    } catch (error) {
      console.log({ error });
      res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    }
  });
  
router.get("/", async (req, res) => {
    try {
      const allBanners = await models.Banner.find({}).populate("parent");
      res.status(200).json(allBanners);
    } catch (error) {
      res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    }
  });
router.get("/:bannerId", async (req, res) => {
  const bannerId = req.params.bannerId;
  console.log(bannerId.length);
  //TODO Validate object id
  try {
    mongoose.Types.ObjectId.isValid(bannerId);
    const bannerId = await models.Banner.findById(bannerId);
    res.status(200).json({ CODE: foundedBanner });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// add a new banner              /category POST {BODY}
router.post("/", async (req, res) => {
  const { image, parent, parentType } = req.body;
  try {
    const postedImg = await models.Banner({ image, parent, parentType }).save();
    console.log(postedImg);

    res.status(201).json({ CODE: statusCodes.DL_BANNER });
  } catch (error) {
    console.log({ error: error.message });
    if (error.message.includes("require"))
      res.status(500).json({ CODE: statusCode.ER_PARAMS });
    else res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//update banner by id            /category/:categoryId  {body}
router.put("/:bannerId", async (req, res) => {
  const bannerId = req.params.bannerId;
  try {
    mongoose.Types.ObjectId.isValid(bannerId);
    

    // check id in database
    const foundedBanner = await models.Banner.findById(bannerId);
    if (!foundedBanner)
      return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    const { fieldChange, newValue } = req.body;
    const update = {};
    update[fieldChange] = newValue;
    await models.Banner.findByIdAndUpdate(bannerId, update);
    res.status(200).json({ CODE: statusCodes.UP_SLIDER });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//delete a banner by id          /banner/:bannerId
router.delete("/:bannerId", async (req, res) => {
  const bannerId = req.params.bannerId;
  try {
    mongoose.Types.ObjectId.isValid(bannerId);
    // check id in database
    const foundedBanner = await models.Banner.findById(bannerId);
    if (!foundedBanner)
      return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    await models.Banner.findByIdAndDelete(bannerId);
    res.status(200).json({ CODE: statusCodes.DL_BANNER });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
