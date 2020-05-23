const { statusCodes, configs } = require("../../values");
const models = require("../../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const utils = require("../../utils");

//Login Admin
router.post("/", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (
      (await utils.validation.validPassword(password)) &&
      (await utils.validation.validPhoneNumber(phoneNumber))
    ) {
      const foundedAdmin = await models.Admin.findOne({ phoneNumber });
      const checkPassword = await bcrypt.compare(
        password,
        foundedAdmin.password
      );
      if (checkPassword) {
        const token = await utils.generateToken(phoneNumber);
        await models.Admin.findOneAndUpdate(
          { phoneNumber },
          { $push: { token } }
        );
        res.status(200).json({ token });
      } else res.status(500).json({ CODE: statusCodes.ER_AUTH_FAILED });
    } else res.status(400).json({ CODE: statusCodes.ER_PARAMS });
  } catch (error) {
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

// for adding admin
router.put("/", async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    if (
      (await utils.validation.validPassword(password)) &&
      (await utils.validation.validPhoneNumber(phoneNumber))
    ) {
      await models
        .Admin({
          phoneNumber,
          password: await utils.hashedPassword(password),
        })
        .save();
      res.status(500).json({ CODE: statusCodes.AD_ADMIN_CREATED });
    } else res.status(400).json({ CODE: statusCodes.ER_PARAMS });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ CODE: statusCodes.ER_SMT_WRONG });
  }
});

module.exports = router;
