const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../../models');
const statusCodes = require('../../values/statusCodes');
const utils = require('../../utils');

//  Get all categories by page
router.get('/:page', async (req, res) => {
  const { page } = req.params;
  try {
    const allCategories = await models.Category.paginate({}, { page, limit: 10 });
    res.status(200).json(allCategories);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await models.Category.find({});
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// get category by id
router.get('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    mongoose.Types.ObjectId.isValid(categoryId);
    const foundedCategory = await models.Category.findById(categoryId);
    res.status(200).json(foundedCategory);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// search category by name
router.get('/s/:categoryName', async (req, res) => {
  try {
    const regex = new RegExp(utils.escapeRegex(req.params.categoryName), 'gi');
    const foundedCategories = await models.Category.find({ name: regex });
    res.status(200).json(foundedCategories);
  } catch (e) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// add a new category
router.post('/', async (req, res) => {
  try {
    const { name, image } = req.body;
    console.log({ VALID_IMAGE: await utils.validation.validImage(image) });
    if (utils.validation.validImage(image) && utils.validation.validText(name)) {
      await models.Category({ name, image }).save();

      res.status(201).json({ CODE: statusCodes.AD_CATEGORY });
    } else {
      res.status(500).json({ CODE: statusCodes.ER_PARAMS });
    }
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//update category by id            /category/:categoryId  {body}
router.put('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    // check valid id
    mongoose.Types.ObjectId.isValid(categoryId);

    // check id in database
    const foundedCategory = await models.Category.findById(categoryId);
    if (!foundedCategory) return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });

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
router.delete('/:categoryId', async (req, res) => {
  // Check current id in database
  const categoryId = req.params.categoryId;
  try {
    mongoose.Types.ObjectId.isValid(categoryId);
    const foundedCategory = await models.Category.findById(categoryId);
    if (!foundedCategory) return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    await models.Category.findByIdAndDelete(categoryId);
    res.status(204).json({ CODE: statusCodes.DL_CATEGORY });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
