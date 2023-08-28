require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Client, Doctor } = require('../models');
const { confirmToken } = require('../functions/jwt');
const ACCESSSECRETPHRASE = process.env.JWT_ACCESS_SECRET;
const REFRESHSECRETPHRASE = process.env.JWT_REFRESH_SECRET;

const auth = {

    authAccessTokenValidity: (req, res, next) => {
        const authentification = req.headers['authorization'];
        const token = authentification && authentification.split(' ')[1];
        if(token === undefined){
            return res.status(401).json({error: 'missing token'});
        }
        
        console.log('Verification du token : ');
        jwt.verify(token, ACCESSSECRETPHRASE, (err, user) => {

            if (err){
                return res.status(401).json({error: 'unvalid token'});
            }
                // TODO
                req.user = user;
                console.log('ROLE : ', req.user.role);
                next();
        })
    },

    isAdmin: (req, res) => {
        const { role } = req.user;
        console.log('ROLE ; ', role);
        if( role !== 2 ){
            return res.status(401).json({error: 'User non admin'})
        }
        // next();
    },

    confirmSubscription: async (req, res, next) => {
        const token = req.params.token;
        try {
            const tokenUncrypt = await confirmToken(token);
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