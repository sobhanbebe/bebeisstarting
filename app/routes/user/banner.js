const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");
const statusCodes = require("../../values/statusCodes");

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

module.exports = router;