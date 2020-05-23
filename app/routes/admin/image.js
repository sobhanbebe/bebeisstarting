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

// ====================== Upload image ========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('./images')) fs.mkdirSync('./images', { recursive: true });
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    console.log({ TIME: moment().format('jYYYY/jM/jD') });
    if (file.mimetype === 'image/png') cb(null, req.body.imageName + '.png');
    else if (file.mimetype === 'image/jpeg') cb(null, req.body.imageName + '.jpg');
    else cb(null, false);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') cb(null, true);
  else cb(null, false);
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) res.status(500).json({ Error: 'Error' });
  const imageUrl = configs.BASE_URL + `/images/${req.file.originalname}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;

// const express = require('express');
// const fs = require('fs');
// const multer = require("multer");
// const {configs, strings, errors, successes} = require('../../values');

// const router = express.Router();
// let imagePath = null;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         if (!req.body.imageType) cb(errors.ER_PARAMS, false);
//         switch (req.body.imageType) {
//             case 'sliders':
//                 imagePath = configs.PATH_SLIDER;
//                 break;
//             case 'categories':
//                 imagePath = configs.PATH_CATEGORY;
//                 break;
//             case 'thumbnail':
//                 imagePath = configs.PATH_THUMBNAIL;
//                 break;
//             case 'icons':
//                 imagePath = configs.PATH_ICON;
//                 break;
//             case 'project':
//                 imagePath = configs.PATH_PROJECT;
//                 break;
//             default:
//                 cb(Error.ER_WRONG_IMAGE_TYPE, false);
//                 return;
//         }
//         if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, {recursive: true});
//         cb(null, imagePath);
//     },
//     filename: function (req, file, cb) {
//         if (!req.body.imageName) cb(errors.ER_PARAMS, false);
//         cb(null, req.body.imageName + "." + file.mimetype.split("/")[1])
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') cb(null, true);
//     else cb(null, false);
// };

// const upload = multer({storage, fileFilter});

// //------------------------------------------- Get PhoneNumber  and is new member
// router.post('/', upload.single("image"), async (req, res) => {
//     const imageUrl = strings.BASE_URL_SERVER + imagePath.substr(2) + "/" + req.body.imageName + "." + req.file.mimetype.split("/")[1];
//     res.status(200).json(imageUrl);
// });

// module.exports = router;
