const express = require("express");
const router = express.Router();
const models = require("../../models");
const jwt = require("jsonwebtoken");
const utils = require("../../utils");
const { statusCodes, configs } = require("../../values");

// =============== Login
router.post("/", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!utils.validation(phoneNumber))
      res.status(400).json({ CODE: statusCodes.ER_PARAMS });

    const foundedPhoneNumber = await models.User.findOne({ phoneNumber });
    if (!foundedPhoneNumber)
      return res
        .status(400)
        .json({ CODE: statusCodes.ER_USER_IS_NOT_REGISTERED });
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    utils.sendSms(phoneNumber, "Salam");
    //TODO send sms text
    const verification = await models.Verification({
      verificationCode,
      phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

router.put("/", async (req, res) => {
  const { phoneNumber, verificationCode } = req.body;
  if (
    !utils.validation.validVerificationCode(verificationCode) ||
    !utils.validation.validPhoneNumber(phoneNumber)
  )
    return res.status(500).json({ CODE: statusCodes.ER_PARAMS });

  const resFindToken = await models.Verification.findOne({ phoneNumber });
  if (!resFindToken || resFindToken.verificationCode !== verificationCode)
    res.status(400).json({ CODE: statusCodes.ER_VERIFICATION_TOKEN_WRONG });
  else {
    const token = jwt.sign({ phoneNumber }, configs.TOKEN_SECRET, {
      expiresIn: "9000h",
    });
    await models.User.findOneAndUpdate({ phoneNumber }, { $push: { token } });
    res.status(200).json({ token });
  }
});

module.exports = router;
