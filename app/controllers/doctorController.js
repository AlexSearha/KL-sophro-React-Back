const { hashMyPassword } = require("../functions/bcrypt");
const Doctor = require("../models/Doctor")

const doctorController = {
    
    addDoctor : async (req, res) => {
        const body = req.body;
        const password = req.body.password;
        const passwordHash = await hashMyPassword(password);
        try {

            const newClient = await Doctor.create(body);
            newClient.password = passwordHash;
            await newClient.save();
            res.status(200).json({ message: "Praticien créé avec succès"})   
            
        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    getOneDoctor: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Doctor.findByPk(id)
            res.status(200).json(result)
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la recherche du praticien." });
        }
    },

    updateDoctor: async (req, res) => {
        const { id } = req.params;
        const updatedFields = req.body;

        try {

            const updatedRowCount = await Doctor.update(updatedFields, {
                where: { id: id }
            });
            console.log(updatedRowCount);
            if (updatedRowCount[0] === 0) {
                res.status(404).json({ error: "Praticien non trouvé." });
            } else {
                res.status(200).json({ message: "Mise à jour réussie." });
            }

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du client." });
        }
    },

    deleteDoctor: async (req, res) => {
        const { id } = req.params;
        try {

            const clientId = await Doctor.destroy({
                where: { id: id }
            });
            if (clientId === 1){
                res.status(200).json({ message : 'le praticien a bien été effacé'});
            } else {
                res.status(404).json({ error: 'client non trouvé.'})
            }

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

}

module.exports = doctorController;