const { Appointment, Client } = require("../models");

const appointmentController = {

    getAllAppointments: async ( _, res) => {
        try {

            const result = await Appointment.findAll()
            res.status(200).json(result);

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },

    getOneAppointment: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Appointment.findByPk(id, {
                include: [ { model: Client, as: 'client'} ]
            })
            res.status(200).json(result);
        } catch (error) {
            
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },
    
    addNewAppointment: async (req, res) => {
        const body = req.body;
        try {
            
            const newAppointment = await Appointment.create(body);
            // console.log(newAppointment);
            res.status(200).json(newAppointment);  
            
        } catch (error) {
            
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
    },
    
    updateAppointment: async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const result = Appointment.update(body, {
                where: { id: id}
            })
            if(result[0] === 0){
                res.status(404).json({ error: 'erreur dans la modification'});
            } else {
                res.status(200).json({ message: 'les modifications ont été éffectués'});
            }
        } catch (error) {
                        
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
        
    }
};

module.exports = appointmentController;
