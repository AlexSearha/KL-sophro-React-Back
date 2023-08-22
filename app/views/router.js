import { Router } from "express";
import clientController from "../controllers/clientController.js";

const router = Router();

// Client
router.get('/client', clientController.getAllClients);
router.post('/client', clientController.addClient);
router.patch('/client/:id', clientController.updateClient)
router.delete('/client/:id', clientController.deleteClient);



export default router;

