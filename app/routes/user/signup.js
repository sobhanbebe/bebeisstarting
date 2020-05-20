const express = require("express");
const router = express.Router();
const { statusCodes, configs } = require("../../values");
const models = require("../../models");
const jwt = require("jsonwebtoken");
const utils = require("../../utils");

// get phone number and name and send sms
router.post("/", async (req, res) => {
  try {
    const {mobileNumber} = req.body;
    if (!utils.validation.validPhoneNumber(mobileNumber))
    return res.status(400).json({ CODE: statusCodes.ER_PARAMS });

    const foundedMobile = await models.Verification.findOne({ mobileNumber });
    if (foundedMobile){
      return res.status(400).json({ CODE: statusCodes.ER_TOO_MANY_ATTEMPTS });

    }else {
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      console.log(verificationCode); // 6 DIGITS
      // utils.sendSms(phoneNumber, verificationCode) 
      await models.Verification({ verificationCode, mobileNumber }).save();
      console.log(utils.sendSms);

      res.status(200).json({ CODE: statusCodes.AD_USER_CREATED });
     
    }
    
  }catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// verification code
router.put("/", async (req, res) => {
  const { mobileNumber, verificationCode } = req.body;
  try {

    if (
      !utils.validation.validVerificationCode(verificationCode) ||
      !utils.validation.validPhoneNumber(mobileNumber)
    )
      return res.status(500).json({ CODE: statusCodes.ER_PARAMS });

    const resFindToken = await models.Verification.findOne({ mobileNumber });
    if (!resFindToken || resFindToken.verificationCode !== verificationCode)
      return res
        .status(400)
        .json({ CODE: statusCodes.ER_VERIFICATION_TOKEN_WRONG });

    const token = jwt.sign({ mobileNumber }, configs.TOKEN_SECRET, {
      expiresIn: "9000h",
    });

    await models.User({ mobileNumber }).save();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ CODE: ER_SMT_WRONG });
  }
});

module.exports = router;
