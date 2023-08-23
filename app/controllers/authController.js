const { checkMyPasssword } = require('../functions/bcrypt');
const { generateLoginToken } = require('../functions/jwt');
const { Client, Doctor, Role } = require('../models'); 

const authController = {
    
    login: async (req, res) => {
        const { email, password } = req.body;
        try {   
            
            const findClient = await Client.findAll({
                where: { email: email },
                include: 'role'
            })
            const findDoctor = await Doctor.findAll({
                where: { email: email} ,
                include: { model: Role }
            })
            if( findClient.length !== 0 || findDoctor.length){
                
                if(findClient.length !== 0){
                    const checkClientPassword = checkMyPasssword(password, findDoctor[0].password);
                    
                    if(checkClientPassword){
                        const ClientTokens = generateLoginToken(findClient[0].dataValues)
                        res.cookie("refresh_token", ClientTokens.refreshToken, { httpOnly : true })
                        res.status(200).json(ClientTokens.accessToken);
                    
                    } else {
                    
                        res.status(404).json({error : 'Mot de passe incorrect'})
                    
                    }
                    res.status(200).json(findClient);

                } else {
                    const checkDoctorPassword = checkMyPasssword(password, findDoctor[0].password);

                    if(checkDoctorPassword){
                        const DoctorTokens = generateLoginToken(findDoctor[0].dataValues)
                        res.cookie("refresh_token", DoctorTokens.refreshToken, { httpOnly : true })
                        res.status(200).json(DoctorTokens.accessToken);
                    
                    } else {
                    
                        res.status(404).json({error : 'Mot de passe incorrect'})
                    
                    }
                }

            }else{

                res.status(404).json({error : 'Aucun utilisateur de trouvé'});
                
            }

        } catch (error) {
            
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    }
}

module.exports = authController;