// ================= Send MSG
const SC_SMS_SEND_TO_USER = 6010;

// ================= Error
const ER_USER_EXIST = 1097;
const ER_PARAMS = 1098;
const ER_SMT_WRONG = 1099;
const ER_SMS_SEND_USER = 1010;
const ER_USER_NOT_FOUND = 1011;
const ER_VERIFICATION_TOKEN_WRONG = 1012;
const ER_TOO_MANY_ATTEMPTS = 1013;
const ER_USER_IS_NOT_REGISTERED=1014;
const ER_USER_NOT_REGISTERED = 1015;
// ================== Update
const UP_CATEGORY = 3010;
const UP_PRODUCT = 3011;
const UP_BANNER = 3012;
const UP_SLIDER = 3013;
//=============== Added
const AD_CATEGORY = 2010;
const AD_PRODUCT = 2011;
const AD_BANNER = 2012;
const AD_SLIDER = 2013;
const AD_USER_CREATED = 2014;
const AD_TO_CART = 2015;
//=============== Deleted
const DL_CATEGORY = 4010;
const DL_PRODUCT = 4011;
const DL_BANNER = 4012;
const DL_SLIDER = 4013;
//================ User
const US_EXS = 5010;
const US_REG = 5011;
const USER_LOGGED = 5012;
const USER_IS_NOT_FOUND = 5013;
const USER_UPDATED = 5014;
//========= Errors
const statusCodes = {
  ER_SMT_WRONG,
  ER_PARAMS,
  ER_USER_EXIST,
  ER_SMS_SEND_USER,
  ER_USER_NOT_FOUND,
  ER_VERIFICATION_TOKEN_WRONG,
  ER_USER_IS_NOT_REGISTERED,
  ER_TOO_MANY_ATTEMPTS,
  ER_USER_NOT_REGISTERED,
  ///============= Updates
  UP_BANNER,
  UP_SLIDER,
  UP_CATEGORY,
  UP_PRODUCT,

  //====== Added
  AD_SLIDER,
  AD_CATEGORY,
  AD_BANNER,
  AD_USER_CREATED,
  AD_PRODUCT,
  AD_TO_CART,
  //====== Deleted
  DL_SLIDER,
  DL_CATEGORY,
  DL_BANNER,
  DL_PRODUCT,

  //==============
  US_REG,
  US_EXS,
  USER_LOGGED,
  USER_IS_NOT_FOUND,
  USER_UPDATED,

  // ====== Send msg
  SC_SMS_SEND_TO_USER,
};

module.exports = statusCodes;
