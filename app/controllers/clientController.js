import { hashMyPassword } from "../functions/bcrypt.js";
import Client from "../models/Client.js";

const clientController = {
    
    getAllClients: async ( _, res) => {
        try {

            const result = await Client.findAll();
            res.status(200).json(result);

        } catch (error) {
            
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    getOneClient: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Client.findByPk(id)
            res.status(200).json(result)
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        }
    },

    addClient: async (req, res) => {
        const body = req.body;
        const password = req.body.password;
        const passwordHash = await hashMyPassword(password);
        
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

    updateClient: async (req, res) => {
        const { id } = req.params;
        const updatedFields = req.body;

        try {

            const updatedRowCount = await Client.update(updatedFields, {
                where: { id: id }
            });
            console.log(updatedRowCount);
            if (updatedRowCount[0] === 0) {
                res.status(404).json({ error: "Client non trouvé." });
            } else {
                res.status(200).json({ message: "Mise à jour réussie." });
            }

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données.." });
        }
    },

    deleteClient: async (req, res) => {
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

export default clientController;