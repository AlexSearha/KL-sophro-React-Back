require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESSSECRETPHRASE = process.env.JWT_ACCESS_SECRET;
const REFRESHSECRETPHRASE = process.env.JWT_ACCESS_SECRET;
const EMAILCONFIRMATIONPHRASE = process.env.JWT_EMAIL_CONFIRM_SECRET;

function generateLoginToken(data) {
    const {email, id, role_id } = data;
    
    const accessToken = jwt.sign({
        id: id,
        email: email,
        role: role_id
      }, ACCESSSECRETPHRASE , { expiresIn: '1d' });
      
      const refreshToken = jwt.sign({
        id: id,
        email: email,
        role: role_id
      }, REFRESHSECRETPHRASE , { expiresIn: '10d' });

      return { accessToken, refreshToken }
}

function generateEmailConfirmationToken(data){
  const {email, id, role_id } = data;

  return jwt.sign({
    id: id,
    email: email,
    role: role_id
  }, EMAILCONFIRMATIONPHRASE , { expiresIn: '1800' });
}

module.exports = { generateLoginToken, generateEmailConfirmationToken }