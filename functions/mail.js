/**
 * Configuracion de correo compartida por las funciones del portal.
 */
const { defineSecret, defineString } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

const smtpPassword = defineSecret("SMTP_PASSWORD");
const smtpHost = defineString("SMTP_HOST", { default: "smtp.gmail.com" });
const smtpPort = defineString("SMTP_PORT", { default: "465" });
const smtpUser = defineString("SMTP_USER", { default: "prfwbwallofpray@gmail.com" });
const smtpFrom = defineString("SMTP_FROM", { default: "PRFWB Muro de Oracion <prfwbwallofpray@gmail.com>" });

function createTransporter() {
  return nodemailer.createTransport({
    host: smtpHost.value(),
    port: Number(smtpPort.value()),
    secure: Number(smtpPort.value()) === 465,
    auth: {
      user: smtpUser.value(),
      pass: smtpPassword.value()
    }
  });
}

module.exports = { smtpPassword, smtpUser, smtpFrom, createTransporter };
