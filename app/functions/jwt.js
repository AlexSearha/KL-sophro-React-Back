require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESSSECRETPHRASE = process.env.JWT_ACCESS_SECRET;
const REFRESHSECRETPHRASE = process.env.JWT_ACCESS_SECRET;
const EMAILCONFIRMATIONPHRASE = process.env.JWT_EMAIL_CONFIRM_SECRET;


function generateLoginTokens(data) {
    const { email, id, role_id } = data;
    
    const accessToken = jwt.sign({
        id: id,
        email: email,
        role: role_id
      }, ACCESSSECRETPHRASE , { expiresIn: 60*60 });
      
      const refreshToken = jwt.sign({
        id: id,
        email: email,
        role: role_id
      }, REFRESHSECRETPHRASE , { expiresIn: '2d' });

      return { accessToken, refreshToken }
}

function generateEmailConfirmationToken(data){
  const { email, id } = data;

  return jwt.sign({
    id: id,
    email: email,
  }, EMAILCONFIRMATIONPHRASE , { expiresIn: 25*60 });
}

async function confirmEmailToken(tokenToCheck){
  return new Promise( (resolve, reject) => {
    jwt.verify(tokenToCheck, EMAILCONFIRMATIONPHRASE, (err, decoded) => {
      if(err){
        reject('JWT expired');
      }
      if(decoded){
        resolve(decoded);
      }
    })
  })
}

async function confirmRefreshToken(tokenToCheck){
  return new Promise( (resolve, reject) => {
    jwt.verify(tokenToCheck, REFRESHSECRETPHRASE, (err, decoded) => {
      if(err){
        reject('JWT expired');
      }
      if(decoded){
        resolve(decoded);
      }
    })
  })
}

async function confirmAccessToken(tokenToCheck){
  return new Promise( (resolve, reject) => {
    jwt.verify(tokenToCheck, ACCESSSECRETPHRASE, (err, decoded) => {
      if(err){
        reject('JWT expired');
      }
      if(decoded){
        resolve(decoded);
      }
    })
  })
}

module.exports = { 
  generateLoginTokens, 
  generateEmailConfirmationToken, 
  confirmEmailToken, 
  confirmRefreshToken, 
  confirmAccessToken 
}