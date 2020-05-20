const joi = require("@hapi/joi");

const Validator = joi.object({
  phoneNumber: joi.string().required().min(11).max(11),
  verificationCode: joi.number().required().min(6).max(6),
});

const validPhoneNumber = async (phoneNumber) => {
  const isValid = await Validator.validate({ phoneNumber });
  if (isValid.error) return false;
  else return true;
};
const validVerificationCode = async (verificationCode) => {
  const isValid = await Validator.validate({ verificationCode });
  if (isValid.error) return false;
  else return true;
};

module.exports = {
  validPhoneNumber,
  validVerificationCode,
};
