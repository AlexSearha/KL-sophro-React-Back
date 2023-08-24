const { Router } = require('express');
const auth = require('../middleware/auth');
const clientController = require('../controllers/clientController');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');

const router = Router();

// Client
router.route('/client')
  .get(auth.authAccessTokenValidity,auth.isAdmin, clientController.getAllClients)
  .post(clientController.addClient);
router.route('/client/:id(\\d+)')
  .get(auth.authAccessTokenValidity, clientController.getOneClient)
  .patch(auth.authAccessTokenValidity, clientController.updateOneClient)
  .delete(auth.authAccessTokenValidity ,clientController.deleteOneClient);
  
  // Doctor
router.post('/doctor',auth.authAccessTokenValidity,auth.isAdmin, doctorController.addDoctor);

router.route('/doctor/:id(\\d+)')
  .get(auth.authAccessTokenValidity, doctorController.getOneDoctor)
  .patch(auth.authAccessTokenValidity,auth.isAdmin, doctorController.updateDoctor)
  .delete(auth.authAccessTokenValidity,auth.isAdmin, doctorController.deleteDoctor);
  
  // Appointment
router.get('/appointment',auth.authAccessTokenValidity, appointmentController.getAllAppointments);

router.route('/appointment/:id(\\d+)')
  .get(auth.authAccessTokenValidity, appointmentController.getOneAppointment)
  .patch(auth.authAccessTokenValidity, appointmentController.updateOneAppointment)
  .delete(auth.authAccessTokenValidity ,appointmentController.deleteOneAppointment);

router.post('/client/:id(\\d+)/appointment', auth.authAccessTokenValidity, appointmentController.addNewAppointment);
  
// Login
router.post('/login',authController.login);

router.get('/loggout', authController.loggout);

// 404
router.get('*', ( _, res) => {
  res.status(404)
})

module.exports = router;

