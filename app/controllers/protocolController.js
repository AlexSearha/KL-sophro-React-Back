const { Protocol } = require("../models");

const protocolController = {
    getAllProtocols: async ( _, res) => {
        try {
            const result = await Protocol.findAll({
                include: 'appointments'
            });
            res.status(200).json(result);
        } catch (error) {
            
            console.error("Error :", error);
            res.status(500).json({ error: "An error occurred..." });
        }
    },
    
    getOneProtocol: async ( req, res ) => {
        const { id } = req.params;
        
        try {
            const result = await Protocol.findByPk(id, {
                include: 'appointments'
            });

            if(!result){
                return res.status(404).json({error : 'user not found'})
            }
            res.status(200).json(result);
            
        } catch (error) {
            
            console.error("Error :", error);
            res.status(500).json({ error: "An error occurred..." });
        }
    },

    addNewProtocol: async ( req, res, next ) => {
        const body = req.body;

        try {
            const result = await Protocol.create(body);
            if(!result){
                return next();
            }
            res.status(200).json({message : "new protocol added"});

        } catch (error) {

            console.error( "Error :", error );
            res.status(500).json({ error: "An error occurred..." });
        }
    },

    updateOneProtocol: async ( req, res ) => {
        const { id } = req.params;
        const updateBody = req.body;
        
        try {
            const findProtocol = await Protocol.findByPk(id);
            if(!findProtocol){
                return res.status(404).json({error : 'user not found'})
            }
            await findProtocol.update(updateBody);
            await findProtocol.save();
            
            res.status(200).json({ message : "protocol successfully updated" });
        } catch (error) {
            
            console.error( "Error :", error );
            res.status(500).json({ error: "An error occurred..." });
        }
    },

    deleteOneProtocol: async ( req, res ) => {
        const { id } = req.params;
        
        try {
            await Protocol.destroy({
                where: { id: id }
            });
            
            res.status(200).json({ message : 'protocol successfully deleted' });
        } catch (error) {
            
            console.error("Error :", error);
            res.status(500).json({ error: "An error occurred..." });
        }
    },
}

module.exports = protocolController;