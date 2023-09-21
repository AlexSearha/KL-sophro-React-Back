const { checkMyPassword, hashMyPassword } = require('../functions/bcrypt');
const { generateLoginTokens, confirmEmailToken, confirmAccessToken, confirmRefreshToken } = require('../functions/jwt');
const { emailReinitPassword } = require('../functions/nodemailer');
const { Client, Doctor, Role } = require('../models');

const authController = {
  
  login: async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(404).json({ error: 'email or password missing' })
    }

    try {
      const findClient = await Client.findOne({
        where: { email: email },
        include: 'role'
      });

      const findDoctor = await Doctor.findOne({
        where: { email: email },
        include: { model: Role }
      });

      if(!findClient && !findDoctor) {
        return res.status(404).json({ error: 'user not found' });
      }

      const user = findClient || findDoctor;
      
      if(!user.dataValues.confirmed){
        return res.status(404).json({error: 'user not confirmed'})
      }

      const isPasswordCorrect = checkMyPassword(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'wrong password' });
      }

      const userTokens = generateLoginTokens(user.dataValues);
      const responseJSON = {
        accessToken: userTokens.accessToken,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          student: user.student,
          address: user.address,
          phone: user.phone_number,
          photo: user.photo,
          newsletter: user.newsletter,
          notification: user.notification,
          role: user.role_id,
        }
      }
      res.cookie('refresh_token', userTokens.refreshToken, { httpOnly: true });
      res.status(200).json(responseJSON);

    } catch (error) {
      
      console.error("an error occurred :", error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
    
    }
  },

  logout: async ( _, res) => {
      try {
        res.clearCookie('refresh_token');
        res.status(200).json({message: 'logout successfull'})
    } catch (error) {
        console.error("an error occurred :", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
    }
  },

  sendTokenByEmail: async (req, res) => {
    const { email } = req.body;

    try {

      await emailReinitPassword(email);
      res.status(200).json({ message : 'email sent successfully'});

    } catch (error) {

      console.error('an error occurred :', error);
      res.status(400).json({ error: 'error' });  

    }
  } ,

  checkTokenBeforeResetPassword: async (req, res) => {
    const { token } = req.params;
    
    try {
      const tokenValidity = await confirmEmailToken(token)
      const { email } = tokenValidity;
      const userClient = await Client.findOne({ where: { email: email }});
      const userDoctor = await Doctor.findOne({ where: { email: email }});
      const user = userClient || userDoctor;

      if(!user){
        return res.status(404).json({ error: 'user not found' });
      }
      
      if( user && !user.dataValues.confirmed ){
        return res.status(404).json({ error: 'user not confirmed' });
      }
      
      res.status(200).json({ message: 'token valid' });
      
      
    } catch (error) {
      
      console.error('an error occurred :', error);
      res.status(401).json({ error: 'expired token' });  

    }
  },

  resetPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const tokenValidity = await confirmEmailToken(token)
      const { email } = tokenValidity;
      const userClient = await Client.findOne({ where: { email: email }});
      const userDoctor = await Doctor.findOne({ where: { email: email }});
      const user = userClient || userDoctor;

      if(!user){
        return res.status(404).json({ error: 'user not found' });
      }
      
      if( user && !user.dataValues.confirmed ){
        return res.status(404).json({ error: 'user not confirmed' });
      }

      const encryptPassword = hashMyPassword(password);
      user.password = encryptPassword;
      await user.save();
      res.status(200).json({ message : 'password successfully changed'});

    } catch (error) {

      console.error('an error occurred :', error);
      res.status(400).json({ error: 'expired token' }); 
    }
  },

  regenerateAccessToken: async (req, res) => {
    const { accessToken } = req.body;
    console.log(accessToken);
    const extractToken = accessToken?.split('Bearer ')[1];
    console.log('extractToken: ', extractToken);

    try {

      const checkToken = await confirmAccessToken(extractToken);
      if(checkToken){
        return res.status(200).json({message : 'accessToken valid'})
      }

    } catch (error) {

      console.log('ERROR: ',error);
      if(error === 'JWT expired' || error === 'JWT malformed'){

        try {

          const refreshToken = req.cookies.refresh_token;
          const checkRefresh = await confirmRefreshToken(refreshToken);
          if(checkRefresh){
            const newTokens = generateLoginTokens(checkRefresh);
            res.setHeader('accessToken', `Bearer ${newTokens.accessToken}`);
            res.cookie('refresh_token', newTokens.refreshToken)
            res.status(200).json({message : 'tokens regenerated'})
          }
        } catch (error) {
          if(error === 'JWT expired' || error === 'JWT malformed'){
            return res.status(401).json({message: 'refresh token expired'})
          }
        }

      }
    }
  }
};

module.exports = authController;
