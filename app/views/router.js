import { Router } from "express";
import clientController from "../controllers/clientController.js";
import doctorController from "../controllers/doctorController.js";
import appointmentController from "../controllers/appointmentController.js";

const router = Router();

// Client
router.route('/client')
  .get(clientController.getAllClients)
  .post(clientController.addClient);
router.route('/client/:id(\\d+)')
  .get(clientController.getOneClient)
  .patch(clientController.updateClient)
  .delete(clientController.deleteClient);

// Doctor
router.post('/doctor',doctorController.addDoctor)
router.route('/:id(\\d+)')
  .get(doctorController.getOneDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

// Appointment
router.route('/appointment')
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.addNewAppointment)

// Login
router.post('/login', doctorController.addDoctor);



export default router;

