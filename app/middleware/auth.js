require('dotenv').config();
const jwt = require('jsonwebtoken');
const ACCESSSECRETPHRASE = process.env.JWT_ACCESS_SECRET;
const REFRESHSECRETPHRASE = process.env.JWT_REFRESH_SECRET;

const auth = {

    authAccessTokenValidity: (req, res, next) => {
        const authentification = req.headers['authorization'];
        const token = authentification && authentification.split(' ')[1];
        // console.log('token : ',token);
        if(token === undefined){
            return res.status(401).json({error: 'token absent'});
        }
        
        console.log('Verification du token : ');
        jwt.verify(token, ACCESSSECRETPHRASE, (err, user) => {
            // console.log('Phrase secrete : ',ACCESSSECRETPHRASE);
            // console.log('on rentre dans la fonction de vérification JWT');
            if (err){
                return res.status(401).json({error: 'token non valide'});
            }
                // TODO
                req.user = user;
                console.log('ROLE : ', req.user.role);
                next();
        })
    },

    isAdmin: (req, res, next) => {
        const { role } = req.user;
        console.log('ROLE ; ', role);
        if( role !== 2 ){
            return res.status(401).json({error: 'User non admin'})
        }
        // next();
    }

    // authRefreshTokenValidity : (req, res, next) => {
    //     const authentification = req.headers['authorization'];
    //     const token = authentification && authentification.split(' ')[1];
    
    //     if(!token){
    //         return res.sendStatus(401);
    //     }
    
    //     jwt.verify(token, REFRESHSECRETPHRASE, (err, user) => {
    //         if (err){
    //             return res.sendStatus(401);
    //         }
    //             req.user = user;
    //             next();
    //     })
    // }
};

module.exports = auth;