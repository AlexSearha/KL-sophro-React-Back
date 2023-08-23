require('dotenv').config();
const bcrypt = require("bcrypt");

const SALT = parseInt(process.env.SALT_ROUNDS);

function hashMyPassword(myPasswordToHash){
    return bcrypt.hashSync( myPasswordToHash, SALT)
}

function checkMyPasssword(passwordToCompare, truePassword){
    return bcrypt.compareSync(passwordToCompare, truePassword)
}

module.exports = { hashMyPassword, checkMyPasssword }