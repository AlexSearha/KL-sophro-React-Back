const { Router } = require('express');
const auth = require('../middleware/auth');
const clientController = require('../controllers/clientController');
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');
const protocolController = require('../controllers/protocolController');
const sanitize = require('../middleware/sanitize');

const router = Router();

// SANITIZE ALL ROUTES
router.route('*')
  .post(sanitize)
  .patch(sanitize);

// CLIENT
router.route('/client')
  .get(auth.authAccessTokenValidity,auth.isAdmin, clientController.getAllClients)
  .post(clientController.addNewClient);

router.route('/client/:id(\\d+)')
  .get(auth.authAccessTokenValidity, clientController.getOneClient)
  .patch(auth.authAccessTokenValidity, clientController.updateOneClient)
  .delete(auth.authAccessTokenValidity ,clientController.deleteOneClient);
  
  // DOCTOR
router.post('/doctor',auth.authAccessTokenValidity,auth.isAdmin, doctorController.addDoctor);

router.route('/doctor/:id(\\d+)')
  .get(auth.authAccessTokenValidity, doctorController.getOneDoctor)
  .patch(auth.authAccessTokenValidity,auth.isAdmin, doctorController.updateDoctor)
  .delete(auth.authAccessTokenValidity,auth.isAdmin, doctorController.deleteDoctor);
  
  // APPOINTMENT
router.get('/appointment',auth.authAccessTokenValidity, appointmentController.getAllAppointments);

router.route('/appointment/:id(\\d+)')
  .get(auth.authAccessTokenValidity, appointmentController.getOneAppointment)
  .patch(auth.authAccessTokenValidity, appointmentController.updateOneAppointment)
  .delete(auth.authAccessTokenValidity ,appointmentController.deleteOneAppointment);

router.post('/client/:id(\\d+)/appointment', auth.authAccessTokenValidity, appointmentController.addNewAppointment);
// Add an appointment to a protocol
router.post('/protocol/:protocolId/appointment', appointmentController.addToProtocol);
// Delete an appointment to a protocol
router.delete('/protocol/:protocolId/appointment/:appointmentId', appointmentController.removeFromProtocol);


// PROTOCOL
router.get('/protocol',protocolController.getAllProtocols);

router.route('/protocol/:id(\\d+)')
.get(protocolController.getOneProtocol)
.post(protocolController.addNewProtocol)
.patch(protocolController.updateOneProtocol)
.delete(protocolController.deleteOneProtocol);


// LOGIN
router.post('/login',authController.login);

// LOGGOUT
router.get('/loggout', authController.loggout);

// CONFIRMATION SUBSCRIPTION
router.get('/confirm/:token', auth.confirmSubscription)

// RESET PASSWORD
router.post('/reset-password', authController.sendTokenByEmail);

router.route('/reset-password/:token')
  .get(authController.checkTokenBeforeResetPassword)
  .post(authController.resetPassword);

// 404 PAGE
router.get('*', ( _, res) => {
  res.status(404).json
})

module.exports = router;

