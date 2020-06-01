const TOKEN_SECRET = 'P3RN1PR!V7T3K3Y';
const SEND_SMS_URL = 'http://185.37.53.162:8080/Messages/SendViaURL?Username=pernymarket&password=222&SenderId=10001333310161&';

const MONGOOSE_USR = 'pernyAdmin';
const MONGOOSE_PWD = 'P3rn!AdM4n';
const MONGOOSE_PORT = '27017';
const MONGOOSE_IP = '185.94.98.209';
const MONGOOSE_DATABASE_NAME = 'PernyDb';
const MONGOOSE_CONNECTION_URL = `mongodb://${MONGOOSE_USR}:${MONGOOSE_PWD}@${MONGOOSE_IP}:${MONGOOSE_PORT}/${MONGOOSE_DATABASE_NAME}`;
const MONGOOSE_CONFIG = { useNewUrlParser: true, authSource: MONGOOSE_DATABASE_NAME, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true };
const BASE_URL = 'https://pernymarket.ir/';

module.exports = {
  TOKEN_SECRET,
  BASE_URL,
  SEND_SMS_URL,
  MONGOOSE_CONNECTION_URL,
  MONGOOSE_CONFIG,
};
