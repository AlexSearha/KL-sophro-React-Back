const { hashMyPassword } = require("../functions/bcrypt");
const { generateEmailConfirmationToken } = require("../functions/jwt");
const { emailConfirmSubscribeToken } = require("../functions/nodemailer");
const { Client } = require('../models')

const clientController = {
    
    getAllClients: async ( _, res) => {
        try {

            const result = await Client.findAll({
                include: 'appointments'
            });
            res.status(200).json(result);

        } catch (error) {
            
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    getOneClient: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Client.findByPk(id, {
                include: ['appointments', 'role']
            })
            res.status(200).json(result)
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        }
    },

    addNewClient: async (req, res) => {
        const body = req.body;
        const { email, password } = req.body;
        const passwordHash = hashMyPassword(password);
        
        try {

            const newClient = await Client.create(body);
            newClient.password = passwordHash;
            await newClient.save();
            const tokenConfirmToSend = generateEmailConfirmationToken(body)
            await emailConfirmSubscribeToken(email, tokenConfirmToSend);
            res.status(200).json({ message: "Client créé avec succès"})   
            
        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    updateOneClient: async (req, res) => {
        const { id } = req.params;
        const updateBody = req.body;
        console.log(updateBody.email);

        try {

            const result = await Client.findByPk(id);

            if(result === null){
                return res.status(404).json({error: 'client non trouvé'});
            } 
            
            if(updateBody.email && result.dataValues.email !== updateBody.email){
                res.status(401).json({error: 'Mise à jour email interdite'});

            } else {
                await result.update(updateBody);
                await result.save();
                res.status(200).json({message: 'Modifications éffectuées'});

            }

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données.." });
        }
    },

    deleteOneClient: async (req, res) => {
        const { id } = req.params;
        const { role } = req.user;

        try {

            const client = await Client.findByPk(id);

            if(role !== 2){
                if(client.dataValues.id === id){
                    await client.destroy();
                    res.status(200).json({message: 'client successfully deleted'});
                    
                } else {
                    
                    return res.status(401).json({error: 'unauthorized action'});
                }
            } else {
                await client.destroy();
                res.status(200).json({message: 'client successfully deleted'});
                
            }

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

}

module.exports = clientController;