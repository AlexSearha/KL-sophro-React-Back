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
  // .get(auth.authTokensValidity, clientController.getAllClients)
  .get(clientController.getAllClients)
  .post(clientController.addNewClient);

router.route('/client/:id(\\d+)')
  .get(auth.authTokensValidity, clientController.getOneClient)
  .patch(auth.authTokensValidity, clientController.updateOneClient)
  .delete(auth.authTokensValidity ,clientController.deleteOneClient);
  
  // DOCTOR
router.post('/doctor',auth.authTokensValidity,auth.isAdmin, doctorController.addDoctor);

router.route('/doctor/:id(\\d+)')
  .get(auth.authTokensValidity, doctorController.getOneDoctor)
  .patch(auth.authTokensValidity,auth.isAdmin, doctorController.updateDoctor)
  .delete(auth.authTokensValidity,auth.isAdmin, doctorController.deleteDoctor);
  
  // APPOINTMENT
router.get('/appointment',auth.authTokensValidity, appointmentController.getAllAppointments);

router.route('/appointment/:id(\\d+)')
  .get(auth.authTokensValidity, appointmentController.getOneAppointment)
  .patch(auth.authTokensValidity, appointmentController.updateOneAppointment)
  .delete(auth.authTokensValidity ,appointmentController.deleteOneAppointment);

router.post('/client/:clientId(\\d+)/appointment', auth.authTokensValidity, appointmentController.addNewAppointment);
// Add an appointment to a protocol
router.post('/protocol/:protocolId/appointment', appointmentController.addToProtocol);
// Delete an appointment to a protocol
router.delete('/protocol/:protocolId/appointment/:appointmentId', appointmentController.removeFromProtocol);


// PROTOCOL
router.route('/protocol')
  .get(auth.isAdmin, protocolController.getAllProtocols)
  .post(auth.isAdmin, protocolController.addNewProtocol);

router.route('/protocol/:id(\\d+)')
  .get(auth.isAdmin, protocolController.getOneProtocol)
  .patch(auth.isAdmin, protocolController.updateOneProtocol)
  .delete(auth.isAdmin, protocolController.deleteOneProtocol);


// LOGIN
router.post('/login',authController.login);

// LOGGOUT
router.get('/logout', authController.logout);

// CONFIRMATION SUBSCRIPTION
router.get('/confirm/:token', auth.confirmSubscription); 

// REGENERATION ACCESSTOKEN
router.post('/regen-token',authController.regenerateAccessToken)

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

