const express = require('express');
const router = express.Router();
const models = require('../../models');
const mongoose = require('mongoose');
const statusCodes = require('../../values/statusCodes');

const escapeRegex = (text) => {
  console.log({ text });
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

router.get('/', async (req, res) => {
  try {
    const allProducts = await models.Product.find({}).populate('category');
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});
router.get('/:page', async (req, res) => {
  const { page } = req.params;
  try {
    const allProducts = await models.Product.paginate({}, { page, limit: 10, populate: 'category' });
    res.status(200).json(allProducts);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

router.get('/:productId', async (req, res) => {
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
router.get('/s/:productName', async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.productName), 'gi');
    const foundedProducts = await models.Product.find({ name: regex });
    res.status(200).json(foundedProducts);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// add a new category              /category POST {BODY}
router.post('/', async (req, res) => {
  const { name, image, realPrice, weight, unit, newPrice, category, discount } = req.body;
  //TODO : check url is our server
  try {
    const discount = Math.floor(((realPrice - newPrice) / realPrice) *100);
    await models.Product({ name, image, realPrice, weight, unit, newPrice, category, discount }).save();
    res.status(201).json({ CODE: statusCodes.AD_PRODUCT });
  } catch (error) {
    if (error.message.includes('require')) return res.status(500).json({ CODE: statusCodes.ER_PARAMS });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//update category by id            /category/:categoryId  {body}
router.put('/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    mongoose.Types.ObjectId.isValid(productId);

    // check id in database
    const foundedProduct = await models.Product.findById(productId);
    if (!foundedProduct) return res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
    const { fieldChange, newValue } = req.body;
    const update = {};
    update[fieldChange] = newValue;
    await models.Product.findByIdAndUpdate(productId, update);
    res.status(200).json({ CODE: statusCodes.UP_PRODUCT });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

//delete a product by id          /category/:categoryId
router.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    mongoose.Types.ObjectId.isValid(productId);
    const foundedProduct = await models.Product.findById(productId);
    if (!foundedProduct) return res.status(500).json({ CODE: statusCode.ER_SMT_WRONG });
    await models.Product.findByIdAndDelete(productId);
    res.status(200).json({ CODE: statusCodes.DL_PRODUCT });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
