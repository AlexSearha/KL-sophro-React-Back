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

// async..await is not allowed in global scope, must use a wrapper
async function emailConfirmationSubscribeToken(emailTo, token) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Katia Lemaire" <contact@mytechcompanion.fr>', // sender address
    to: emailTo, // list of receivers
    subject: "Katia Lemaire Sophrologue : CONFIRMEZ VOTRE COMPTE", // Subject line
    html:     `<p>Bonjour,</p><br><p>Pour confirmer votre compte, veuillez cliquer sur le lien suivant : <span><a href="http://localhost:3000/subscribe/${token}">http://localhost:3000/subscribe/${token}</a></span></p><br><p>Cordialement,</p><br><p>Katia Lemaire Sophrologue<br>22 rue des tisserands, 56190 Noyal-Muzillac<br>Tel: 07.60.31.10.52</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

module.exports = { emailConfirmationSubscribeToken };

// emailConfirmationSubscribeToken().catch(console.error);
