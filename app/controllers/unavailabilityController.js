const { Unavailability } = require("../models");


const UnavailabilityController = {

    getAllAvailabilities: async (req, res) => {
        try {
            
            const result = await Unavailability.findAll();
            if(!result) {
                return res.status(404).json({error: 'unavailability not found'});
            }
            res.status(200).json(result)
            
        } catch (error) {
            
            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une an error occurred lors de la récupération des données." });
        }
    }, 
    
    getOneUnavailability: async (req, res) => {
        const { id } = req.params;
        try {
            
            const result = await Unavailability.findByPk(id);
            if(!result) {
                return res.status(404).json({error: 'unavailability not found'});
            }
            res.status(200).json(result)
            
            
        } catch (error) {
            
            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une an error occurred lors de la récupération des données." });
        }
    }, 
    
    addNewUnavailabilities: async (req, res) => {
        const body = req.body;
        try {
          const whereClause = {};
      
          if(body.date){
            whereClause.date = body.date;
          }

          if (body.days_of_week_from) {
            whereClause.days_of_week_from = body.days_of_week_from;
          }
      
          if (body.days_of_week_to) {
            whereClause.days_of_week_to = body.days_of_week_to;
          }
      
          const dateExist = await Unavailability.findOne({ where: whereClause });
      
          if (dateExist) {
            return res.status(404).json({ error: 'Unavailability params already exist' });
          }
      
          const result = await Unavailability.create(body);
          const jsonToSend = {
            message: 'new unavailability added',
            data: result
          }
          res.status(200).json(jsonToSend);
      
        } catch (error) {
          console.error("Une erreur s'est produite :", error);
          res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
        }
      },
      
    
    deleteUnavailabilities: async (req, res) => {
        const { id } = req.params;
        try {

            const isIdExist = await Unavailability.findByPk(id);

            if(!isIdExist) {
                return res.status(404).json({error: 'unavailability not found'});
            }

            const result = await Unavailability.destroy({ where : { id : id}});
            res.status(200).json({ message: 'unavailability successfully deleted' })

        } catch (error) {

            console.error("an error occurred :", error);
            res.status(500).json({ error: "Une an error occurred lors de la récupération des données." });
        }

    }
};

module.exports = UnavailabilityController;