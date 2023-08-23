const { Router } = require('express');
const clientController = require('../controllers/clientController');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');


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
router.route('/appointment/:id(\\d+)')
  .get(appointmentController.getOneAppointment)
  
// Login
router.post('/login', doctorController.addDoctor);


module.exports = router;

