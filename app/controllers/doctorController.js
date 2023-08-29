const { hashMyPassword } = require("../functions/bcrypt");
const { Doctor, Role } = require("../models");

const doctorController = {
    
    addDoctor : async (req, res) => {
        const body = req.body;
        const password = req.body.password;
        const passwordHash = hashMyPassword(password);
        try {

            const newClient = await Doctor.create(body);
            newClient.password = passwordHash;
            await newClient.save();
            res.status(200).json({ message: "doctor successfully added"})   
            
        } catch (error) {

            console.error("an error occurred :", error);
            res.status(500).json({ error: "an error occurred" });
        
        }
    },

    getOneDoctor: async (req, res) => {
        const { id } = req.params;

        try {

            const result = await Doctor.findByPk(id, {
                include: [{model: Role}]
            })
            if(result !== null){
                res.status(200).json(result)
            } else {
                res.status(404).json({ error: "Praticien non trouvé." });
            }

        } catch (error) {

            console.error("an error occurred :", error);
            res.status(500).json({ error: "an error occurred" });
        }
    },

    updateDoctor: async (req, res) => {
        const { id } = req.params;
        const updatedFields = req.body;

        try {

            const updatedRowCount = await Doctor.update(updatedFields, {
                where: { id: id }
            });
            if (updatedRowCount[0] === 0) {
                res.status(404).json({ error: "Praticien non trouvé." });
            } else {
                res.status(200).json({ message: "Mise à jour réussie." });
            }

        } catch (error) {

            console.error("an error occurred :", error);
            res.status(500).json({ error: "an error occurred" });
        }
    },

    deleteDoctor: async (req, res) => {
        const { id } = req.params;
        try {

            const clientId = await Doctor.destroy({
                where: { id: id }
            });
            if (clientId === 1){
                res.status(200).json({ message : 'doctor has been deleted'});
            } else {
                res.status(404).json({ error: 'doctor not found'})
            }

        } catch (error) {

            console.error("An error occured :", error);
            res.status(500).json({ error: "an error occurred" });
        
        }
    },

}

module.exports = doctorController;