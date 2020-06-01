const express = require("express");
const router = express.Router();
const models = require("../../models");
const statusCodes = require("../../values/statusCodes");

router.get("/", async (req, res) => {
  try {
    const sliders = await models.Slider.find().populate("parent");
    const mostSoldProducts = await models.Product.find().sort({viewCount: -1}).populate("category");
    const categories = await models.Category.find();
    const latestProducts = await models.Product.find().sort({createdAt: -1}).populate("category");
    const banner = await models.Banner.find().populate("parent");
    const highestDiscount = await models.Product.find().sort({discount: -1}).populate("category");
    const homeScreenData = {
      sliders,
      mostSoldProducts,
      categories,
      latestProducts,
      banner: banner[(0, 1)],
      highestDiscount,
      banner: banner[2],
      specialOffers: mostSoldProducts,
      banner: banner[3],
    };
    res.status(200).json(homeScreenData);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
