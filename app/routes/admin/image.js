const express = require('express');
const router = express.Router();
const models = require('../../models');
const statusCodes = require('../../values/statusCodes');
const utils = require('../../utils');
const multer = require('multer');
const configs = require('../../values/configs');
const fs = require('fs');
var moment = require('moment-jalaali');
//  Get all images by page
router.get('/:page', async (req, res) => {
  const { page } = req.params;
  try {
    const allImages = await models.Image.paginate({}, { page, limit: 10 });
    res.status(200).json(allImages);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// Get all images
router.get('/', async (req, res) => {
  try {
    const allImages = await models.Image.find({});
    res.status(200).json(allImages);
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

let imageName = false;
// ====================== Upload image ========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('./images')) fs.mkdirSync('./images', { recursive: true });
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    if (file.mimetype === 'image/png') imageName = req.body.imageName + '.png';
    else if (file.mimetype === 'image/jpeg') imageName = req.body.imageName + '.jpg';
    cb(null, imageName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') cb(null, true);
  else cb(null, false);
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) res.status(500).json({ Error: 'Error' });
  const imageUrl = configs.BASE_URL + `images/${imageName}`;
  try {
    await models.Image({ name: req.body.imageName, url: imageUrl }).save();
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
