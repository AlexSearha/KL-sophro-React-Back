import Appointment from "../models/Appointment.js";

const appointmentController = {

    getAllAppointments: async (req, res) => {
        try {

            const result = await Appointment.findAll()
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
            res.status(200).json(newAppointment, { message: "Rendez-vous créé avec succès"});  

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    }
};

export default appointmentController;
