const { checkMyPasssword } = require('../functions/bcrypt');
const { generateLoginToken } = require('../functions/jwt');
const { Client, Doctor, Role } = require('../models');

const authController = {
  
  login: async (req, res) => {
    const { email, password } = req.body;

    if (req.headers['authorization'] !== undefined) {
      return res.status(200).json({ message: 'Utilisateur déjà authentifié' });
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

      if (!findClient && !findDoctor) {
        return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
      }

      const user = findClient || findDoctor;

      const isPasswordCorrect = checkMyPasssword(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }

      const userTokens = generateLoginToken(user.dataValues);
      res.cookie('refresh_token', userTokens.refreshToken, { httpOnly: true });
      res.status(200).json(userTokens);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
    }
  },

  loggout: async (req, res) => {
      try {
        res.clearCookie('refresh_token');
        res.status(200).json({message: 'Deconnexion réussie'})
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
    }
  }
};

module.exports = authController;
