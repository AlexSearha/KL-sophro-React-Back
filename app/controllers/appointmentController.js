const { Appointment, Protocol, Client } = require("../models");

const appointmentController = {

    getAllAppointments: async ( _, res) => {
        try {

            const result = await Appointment.findAll({
                include : 'client'
            })
            res.status(200).json(result);

        } catch (error) {

            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une an error occurred lors de la récupération des données." });
        
        }
    },

    getOneAppointment: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Appointment.findByPk(id, {
                include: 'client'
            })
            if(result === null){
                res.status(404).json({message : `Client non trouvé`});
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            
            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },
    
    addNewAppointment: async (req, res) => {
        const id  = parseInt(req.params.id);
        const body = req.body;
        try {

            const client = await Client.findByPk(id)
            if(!client){
                return res.status(404).json({error: "client not found"})
            }
            const newAppointment = await Appointment.create(body);
            newAppointment.client_id = id;
            await newAppointment.save();
            res.status(200).json({message : 'new appointment added'});

        } catch (error) {

            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
    },
    
    updateOneAppointment: async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const result = Appointment.update(body, {
                where: { id: id }
            })
            if(result[0] === 0){
                res.status(404).json({ error: 'error during updates'});
            } else {
                res.status(200).json({ message: 'appointment updated successfully'});
            }
        } catch (error) {
                        
            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
        
    },

    deleteOneAppointment : async (req, res) => {
        const { id } = req.params;
        try {

            const result = await Appointment.destroy({
                where: { id: id }
            });
            if(result === 1){
                res.status(200).json({ message: 'appointment deleted successfully'});
            } else {
                res.status(404).json({error: `appointment not found`});
            }

        } catch (error) {
            
            console.error("an error occured: ", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
    },

    addToProtocol: async (req, res) => {
        const { protocolId } = req.params;
        const { appointmentId } = req.body;
        
        try {
            const protocol = await Protocol.findByPk(protocolId);
            if(!protocol){
                return res.status(404).json({error: 'user not found'});
            }
            
            const appointment = await Appointment.findByPk(appointmentId, {include: 'protocols'});
            if (!appointment){
                return res.status(404).json({error: 'appointment not found'});
            }
            
            await protocol.addToProtocol(appointment);
            await protocol.reload();
            res.status(200).json(protocol);
            
        } catch (error) {
            
            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
    },
    
    removeFromProtocol: async (req, res) => {
        const { appointmentId, protocolId } = req.params;

        try {
            const protocol = await Protocol.findByPk(protocolId, {include: "appointments"});
            if(!protocol){
                return res.status(404).json({error: 'user not found'});
            }

            const appointment = await Appointment.findByPk(appointmentId);
            if(!appointment){
                return res.status(404).json({error: 'appointment not found'});
            }
            
            await protocol.removeFromProtocol(appointment);
            await protocol.reload();
            res.json(protocol);
            
        } catch (error) {
            
            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
    }
};

module.exports = appointmentController;
