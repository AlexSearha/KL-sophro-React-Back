const { Appointment, Protocol } = require("../models");

const appointmentController = {

    getAllAppointments: async ( _, res) => {
        try {

            const result = await Appointment.findAll({
                include : 'client'
            })
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
                include: 'client'
            })
            if(result === null){
                res.status(404).json({message : `Client non trouvé`});
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        
        }
    },
    
    addNewAppointment: async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        try {
            const addNewAppointment = await Appointment.create(body)
            addNewAppointment.client_id = id;
            await addNewAppointment.save();
            console.log(addNewAppointment)
            res.status(200).json({message : 'Nouveau rendez-vous créé'});

        } catch (error) {

            console.error("Une erreur s'est produite :", error);
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
                res.status(404).json({ error: 'erreur dans la modification'});
            } else {
                res.status(200).json({ message: 'les modifications ont été éffectués'});
            }
        } catch (error) {
                        
            console.error("Une erreur s'est produite :", error);
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
                res.status(200).json({ message: 'le rendez-vous a été éffacé'});
            } else {
                res.status(404).json({error: `le rendez vous n'a pas été trouvé`});
            }

        } catch (error) {
            
            console.error("Une erreur s'est produite :", error);
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
            
            console.error("Une erreur s'est produite :", error);
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
            
            console.error("Une erreur s'est produite :", error);
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
            
        }
    }
};

module.exports = appointmentController;
