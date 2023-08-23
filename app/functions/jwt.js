require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRETPHRASE = process.env.JWT_SECRET;

function generateLoginToken(data) {
    const {email, id, role_id } = data;
    const accessToken = jwt.sign({
        id: id,
        email: email,
        role: role_id
      }, SECRETPHRASE , { expiresIn: '60s' });
      const refreshToken = jwt.sign({
        id: id,
        email: email,
        role: role_id
      }, SECRETPHRASE , { expiresIn: '1h' });

      return { accessToken, refreshToken }
}

function checkTokenValidity() {}

module.exports = { generateLoginToken, checkTokenValidity }