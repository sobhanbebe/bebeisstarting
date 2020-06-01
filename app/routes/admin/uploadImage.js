const express = require("express");
const multer = require('multer');
const router = express.Router();
const bodyParser= require('body-parser');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './upload');
    },
    filename: (req,file,cb)=>{
       cb(null , file.originalname)
    }
  });
  const upload = multer({
    storage: multerStorage
  });

router.post("/",upload.single('image'),(req, res)=>{
    console.log(req.file);
    res.status(200).json('Imaged Uploaded Successfully')
  
});


module.exports = router;