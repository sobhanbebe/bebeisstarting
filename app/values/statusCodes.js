// ================= Error
const ER_PARAMS = 1098;
const ER_SMT_WRONG = 1099;
// ================== Update
const UP_CATEGORY = 3010;
//=============== Added
const AD_CATEGORY = 2010;
const AD_PRODUCT = 2011;

//=============== Deleted
const DL_CATEGORY = 4010;
const DL_PRODUCT = 4011;

const statusCodes = {
  ER_SMT_WRONG,
  ER_PARAMS,
  AD_CATEGORY,
  AD_PRODUCT,
  UP_CATEGORY,
  DL_CATEGORY,
  DL_PRODUCT,
};

module.exports = statusCodes;
