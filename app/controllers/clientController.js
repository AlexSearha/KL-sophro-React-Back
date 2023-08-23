const { hashMyPassword } = require("../functions/bcrypt");
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

    addClient: async (req, res) => {
        const body = req.body;
        const password = req.body.password;
        const passwordHash = hashMyPassword(password);
        
        try {

            const newClient = await Client.create(body);
            newClient.password = passwordHash;
            await newClient.save();
            res.status(200).json({ message: "Client créé avec succès"})   
            
        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    updateOneClient: async (req, res) => {
        const { id } = req.params;
        const updateBody = req.body;

        try {

            const result = await Client.update(updateBody, {
                where: { id: id }
            });
            if (result[0] === 1) {
                res.status(200).json({ message: "Mise à jour réussie." });
            } else {
                res.status(404).json({ error: "Client non trouvé." });
            }

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données.." });
        }
    },

    deleteOneClient: async (req, res) => {
        const { id } = req.params;
        try {

            const clientId = await Client.destroy({
                where: { id: id }
            });
            if (clientId === 1){
                res.status(200).json({ message : 'le client a bien été effacé'});
            } else {
                res.status(404).json({ error: 'client non trouvé.'})
            }

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

}

module.exports = clientController;