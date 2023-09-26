const { hashMyPassword } = require("../functions/bcrypt");
const { generateEmailConfirmationToken } = require("../functions/jwt");
const { emailConfirmSubscribeToken } = require("../functions/nodemailer");
const { Client, Appointment } = require('../models')

const clientController = {
    
    getAllClients: async ( _, res) => {
        try {
        
            const result = await Client.findAll({
                order: [ ['lastname', 'ASC'] ],
                include: 'appointments'
            });
            if(!result){
                return res.status(404).json({error: 'user not found'})
            }
            res.status(200).json(result);

        } catch (error) {
            
            console.error("An error occurred :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    getOneClient: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Client.findByPk(id, {
                include: [{
                    model: Appointment,
                    as: 'appointments',
                }],
                order: [[ {model: Appointment, as: 'appointments'}, 'date', 'ASC' ]]
                

            })
            if(!result){
                return res.status(404).json({error: 'user not found'})
            }
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
            const searchClient = await Client.findOne({where: { email: email }})
            if(searchClient){
                return res.status(401).json({error: 'user already exist'});
            }
            const newClient = await Client.create(body);
            newClient.password = passwordHash;
            await newClient.save();
            const tokenConfirmToSend = generateEmailConfirmationToken(body)
            await emailConfirmSubscribeToken(email, tokenConfirmToSend);
            res.status(201).json({ message: "user added, confirmation token needed"})   
            
        } catch (error) {

            console.error("An error occurred :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    updateOneClient: async (req, res) => {
        const { id } = req.params;
        const updateBody = req.body;

        try {

            const result = await Client.findByPk(id);

            if(!result){
                return res.status(404).json({error: 'client not found'});
            } 
            
            if(updateBody.email && result.dataValues.email !== updateBody.email){
                res.status(401).json({error: 'forbidden update'});

            } else {
                await result.update(updateBody);
                await result.save();
                res.status(200).json(result);

            }

        } catch (error) {

            console.error("An error occurred : ", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données.." });
        }
    },

    deleteOneClient: async (req, res) => {
        const { id } = req.params;
        const val = req.user
        console.log('val: ',val);
        
        // try {
        //     if(!req.user){
        //         return res.status(401).json({error: "user must be connected"})
        //     }
        //     const { role } = req.user;

        //     const client = await Client.findByPk(id);

        //     if(role !== 2){
        //         if(client.dataValues.id === id){
        //             await client.destroy();
        //             res.status(200).json({message: 'client successfully deleted'});
                    
        //         } else {
                    
        //             return res.status(401).json({error: 'unauthorized action'});
        //         }
        //     } else {
        //         await client.destroy();
        //         res.status(200).json({message: 'client successfully deleted'});
                
        //     }

        // } catch (error) {

        //     console.error("an error occurred :", error);
        //     res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        // }
    },

}

module.exports = clientController;