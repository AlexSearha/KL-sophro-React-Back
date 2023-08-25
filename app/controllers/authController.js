const { checkMyPassword, hashMyPassword } = require('../functions/bcrypt');
const { generateLoginToken, confirmToken } = require('../functions/jwt');
const { emailReinitPassword } = require('../functions/nodemailer');
const { Client, Doctor, Role } = require('../models');

const authController = {
  
  login: async (req, res) => {
    const { email, password } = req.body;

    if(req.headers['authorization'] !== undefined) {
      return res.status(200).json({ message: 'user already authentified' });
    }

    if(!email || !password){
      return res.status(404).json({error: 'email or password missing'})
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

      const userTokens = generateLoginToken(user.dataValues);
      res.cookie('refresh_token', userTokens.refreshToken, { httpOnly: true });
      res.status(200).json(userTokens);

    } catch (error) {
      
      console.error("error :", error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
    
    }
  },

  loggout: async ( _, res) => {
      try {
        res.clearCookie('refresh_token');
        res.status(200).json({message: 'loggout successfull'})
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
    }
  },

  sendTokenByEmail: async (req, res) => {
    const { email } = req.body;

    try {
      
      await emailReinitPassword(email);
      res.status(200).json({ message : 'email sent successfully'});

    } catch (error) {

      console.error('Erreur de vérification du token :', error);
      res.status(400).json({ error: 'error' });  

    }
  } ,

  checkTokenBeforeReinitPassword: async (req, res) => {
    const { token } = req.params;
    
    try {
      const tokenValidity = await confirmToken(token)
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
      
      console.error('Erreur de vérification du token :', error);
      res.status(400).json({ error: 'expired token' });  

    }
  },

  reinitPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const tokenValidity = await confirmToken(token)
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

      console.error('Erreur de vérification du token :', error);
      res.status(400).json({ error: 'expired token' }); 
    }
  }
};

module.exports = authController;
