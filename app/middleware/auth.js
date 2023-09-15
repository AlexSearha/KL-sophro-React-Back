require('dotenv').config();
const { Client, Doctor } = require('../models');
const { confirmEmailToken, confirmRefreshToken, confirmAccessToken  } = require('../functions/jwt');

const auth = {

    authTokensValidity: async (req, res, next) => {
        const refreshToken = req.cookies.refresh_token;
        const headersToken = req.headers['authorization'];
        
        if(headersToken){
            const accessToken = headersToken && headersToken.split(' ')[1];
            const isAccessTokenValid = await confirmAccessToken(accessToken);
            if(isAccessTokenValid){
                next();
            }
        } else {
            // console.log('JE RENTRE DANS LA VERIFICATION DU REFRESH TOKEN');
            if(refreshToken){
                const isRefreshTokenValid = await confirmRefreshToken(refreshToken);
                // console.log('RefreshToken Valide ? : ',isRefreshTokenValid);
                const newAccessToken = generateNewAccessToken(isRefreshTokenValid)
                // console.log('New Access Token : ', newAccessToken);
                // console.log('ENvoi du token dans le headers :');
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                next();
            }
        }
        
    },
    
    // loginTokensValidity: async (req, res, next) => {
    //     const refreshToken = req.cookies.refresh_token;
    //     const headersToken = req.headers['authorization'];
        
    //     if(!headersToken && !refreshToken){
    //         next();
    //     }
    // },

    isAdmin: (req, res) => {
        const { role } = req.user;
        console.log('ROLE ; ', role);
        if( role !== 2 ){
            return res.status(401).json({error: 'User non admin'})
        }
        next();
    },

    confirmSubscription: async (req, res, next) => {
        const token = req.params.token;
        try {
            const tokenUncrypt = await confirmEmailToken(token);
            const { email } = tokenUncrypt;
            const userClient = await Client.findOne({ where : { email: email }});
            const userDoctor = await Doctor.findOne({ where : { email: email }});
            const user = userClient || userDoctor;

            if( user.dataValues.email === email ){
                if(user.confirmed){
                    return res.status(404).json({error: 'account already confirmed'});
                }
                user.confirmed = true;
                await user.save();
                res.status(200).json({message: 'account successfully confirmed'});

            } else {

                res.stats(404).json({error: 'invalid email'});
            }

        } catch (error) {
            
            console.error('Erreur de vérification du token :', error);
            res.status(400).json({ error: 'expired token' });   
        }

    }
};

module.exports = auth;