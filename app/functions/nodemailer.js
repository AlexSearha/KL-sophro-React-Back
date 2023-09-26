"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "mail.mytechcompanion.fr",
  port: 465,
  secure: true,
  auth: {
    user: "contact@mytechcompanion.fr",
    pass: MAIL_PASSWORD,
  },
});

async function emailConfirmSubscribeToken(emailTo, token) {
  const info = await transporter.sendMail({
    from: '"Katia Lemaire Sophrologue" <contact@mytechcompanion.fr>', // sender address
    to: emailTo, // list of receivers
    subject: "Confirmation de votre compte", // Subject line
    html:     `<p>Bonjour,</p><br><p>Pour confirmer votre compte, veuillez cliquer sur le lien suivant : <span><a href="http://localhost:3000/confirm/${token}">http://localhost:3000/confirm/${token}</a></span></p><br><p>Cordialement,</p><br><p>Katia Lemaire Sophrologue<br>22 rue des tisserands, 56190 Noyal-Muzillac<br>Tel: 07.60.31.10.52</p>`, // html body
  });


  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

async function emailReinitPassword(emailTo, token) {
  const info = await transporter.sendMail({
    from: '"Katia Lemaire Sophrologue" <contact@mytechcompanion.fr>', // sender address
    to: emailTo, // list of receivers
    subject: "Reinitialisation de votre mot de passe", // Subject line
    html:     `<p>Bonjour,</p><br><p>Veuillez cliquer sur le lien suivant pour reinitialiser votre mot de passe : <span><a href="http://localhost:5173/reinit-mdp/${token}">http://localhost:5173/reinit-mdp/${token}</a></span></p><br>Ce lien sera valable pendant 25 minutes,au dela, il vous sera demander de reiterer votre demande de changement de mot de passe<p>Cordialement,</p><br><p>Katia Lemaire Sophrologue<br>22 rue des tisserands, 56190 Noyal-Muzillac<br>Tel: 07.60.31.10.52</p>`, // html body
  });
  
  console.log("Message sent: %s", info.messageId);
}

async function emailAddNewAppointmentClient(emailTo, appointmentInfos) {
  const {year, month, day, hour, firstname, lastname} = appointmentInfos;
  const info = await transporter.sendMail({
    from: '"Katia Lemaire Sophrologue" <contact@mytechcompanion.fr>', // sender address
    to: emailTo, // list of receivers
    subject: `Votre rendez vous est confirmé`, // Subject line
    html:     `<p>Bonjour ${firstname} ${lastname},</p>Votre rendez-vous du ${day}/${month}/${year} -- ${hour} à bien été prise en compte.</p></br><p>Merci pour votre confiance</p></br>Katia Lemaire - Sophrologue</br>22 rue des tisserands</br>56190, NOYAL MUZILLAC</br>`, // html body
  });
  
  console.log("Message sent: %s", info.messageId);
}

async function emailAddNewAppointmentDoctor(emailTo, appointmentInfos) {
  const {year, month, day, hour, firstname, lastname} = appointmentInfos;
  const info = await transporter.sendMail({
    from: '"Katia Lemaire Sophrologue" <contact@mytechcompanion.fr>', // sender address
    to: emailTo, // list of receivers
    subject: `Nouveau rendez-vous de réservé`, // Subject line
    html:     `<p>Bonjour ,</p>Un nouveau rendez-vous vient d'être programmé: ${day}/${month}/${year} -- ${hour} avec Mme/M ${firstname} ${lastname}</p>`, // html body
  });
  
  console.log("Message sent: %s", info.messageId);
}

async function emailCancelAppointmentClient(emailTo, appointmentInfos) {
  const {year, month, day, hour, minutes, firstname, lastname} = appointmentInfos;
  const info = await transporter.sendMail({
    from: '"Katia Lemaire Sophrologue" <contact@mytechcompanion.fr>', // sender address
    to: emailTo, // list of receivers
    subject: `Annulation de votre rendez-vous`, // Subject line
    html:     `<p>Bonjour ${firstname} ${lastname},</p>L'annulation de votre rendez-vous du ${day}/${month}/${year} -- ${hour}h${minutes} à bien été prise en compte.</p></br>Katia Lemaire - Sophrologue</br>22 rue des tisserands</br>56190, NOYAL MUZILLAC</br>`, // html body
  });
  
  console.log("Message sent: %s", info.messageId);

}

async function emailCancelAppointmentDoctor(emailTo, appointmentInfos) {
  const {year, month, day, hour,minutes, firstname, lastname} = appointmentInfos;
  const info = await transporter.sendMail({
    from: '"Katia Lemaire Sophrologue" <contact@mytechcompanion.fr>', // sender address
    to: emailTo, // list of receivers
    subject: `[ANNULATION] Rendez-vous du ${day}/${month}/${year} -- ${hour}h00 annulé  `, // Subject line
    html:     `<p>Bonjour,</p>L'annulation du rendez-vous ${day}/${month}/${year} -- ${hour}h${minutes} à ${hour + 1}h${minutes} de Mme/M ${firstname} ${lastname} à bien été prise en compte</p>`, // html body
  });
  
  console.log("Message sent: %s", info.messageId);

}

module.exports = { emailConfirmSubscribeToken, emailReinitPassword, emailCancelAppointmentClient, emailCancelAppointmentDoctor, emailAddNewAppointmentClient, emailAddNewAppointmentDoctor };

// emailConfirmationSubscribeToken().catch(console.error);
