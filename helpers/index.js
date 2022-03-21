const generateToken = require('./generateToken');
const googleVerify = require('./googleVerify');
const uploadFile = require('./uploadFile');
const validatorsDB = require('./validatorsDB');

module.exports = {
    ...generateToken,
    ...googleVerify,
    ...uploadFile,
    ...validatorsDB
}