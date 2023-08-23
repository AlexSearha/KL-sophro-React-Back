const { Router } = require('express');
const clientController = require('../controllers/clientController');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');

const router = Router();

// Client
router.route('/client')
  .get(clientController.getAllClients)
  .post(clientController.addClient);
router.route('/client/:id(\\d+)')
  .get(clientController.getOneClient)
  .patch(clientController.updateOneClient)
  .delete(clientController.deleteOneClient);
  
  // Doctor
router.post('/doctor',doctorController.addDoctor);

router.route('/doctor/:id(\\d+)')
  .get(doctorController.getOneDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);
  
  // Appointment
router.get('/appointment',appointmentController.getAllAppointments);

router.route('/appointment/:id(\\d+)')
  .get(appointmentController.getOneAppointment)
  .patch(appointmentController.updateOneAppointment)
  .delete(appointmentController.deleteOneAppointment);

router.post('/client/:id(\\d+)/appointment', appointmentController.addNewAppointment);
  
// Login
router.post('/login', authController.login);


module.exports = router;

