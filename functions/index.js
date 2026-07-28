const { initializeApp } = require("firebase-admin/app");
const { logger } = require("firebase-functions");
const { defineSecret, defineString } = require("firebase-functions/params");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");

initializeApp();

const smtpPassword = defineSecret("SMTP_PASSWORD");
const smtpHost = defineString("SMTP_HOST", { default: "smtp.gmail.com" });
const smtpPort = defineString("SMTP_PORT", { default: "465" });
const smtpUser = defineString("SMTP_USER", { default: "prfwbwallofpray@gmail.com" });
const smtpFrom = defineString("SMTP_FROM", { default: "PRFWB Muro de Oracion <prfwbwallofpray@gmail.com>" });
const prayerNotifyTo = defineString("PRAYER_NOTIFY_TO", { default: "prfwbwallofpray@gmail.com" });
const adminPrayerUrl = defineString("ADMIN_PRAYER_URL", {
  default: "https://creceprfwb.github.io/portal-recursos-discipulado/admin-oracion-wix.html"
});

function cleanText(value, fallback = "Sin informacion") {
  return String(value || fallback).replace(/\s+/g, " ").trim().slice(0, 180);
}

exports.notifyNewPrayerRequest = onDocumentCreated(
  {
    document: "prayerRequests/{requestId}",
    region: "us-central1",
    secrets: [smtpPassword]
  },
  async (event) => {
    const request = event.data && event.data.data();
    if (!request) {
      logger.warn("Prayer request trigger fired without document data.");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost.value(),
      port: Number(smtpPort.value()),
      secure: Number(smtpPort.value()) === 465,
      auth: {
        user: smtpUser.value(),
        pass: smtpPassword.value()
      }
    });

    const title = cleanText(request.title, "Nueva peticion de oracion");
    const category = cleanText(request.category, "General");
    const requester = request.anonymous ? "Anonimo" : cleanText(request.name, "Sin nombre");
    const privacy = cleanText(request.privacy, "public");
    const panelUrl = adminPrayerUrl.value();

    await transporter.sendMail({
      from: smtpFrom.value(),
      to: prayerNotifyTo.value(),
      subject: `Nueva peticion de oracion: ${title}`,
      text: [
        "Nueva peticion de oracion recibida.",
        "",
        `Titulo: ${title}`,
        `Categoria: ${category}`,
        `Nombre: ${requester}`,
        `Privacidad: ${privacy}`,
        "Estado: Pendiente de revision",
        "",
        "Revisar en el panel:",
        panelUrl
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#12384d">
          <h2>Nueva peticion de oracion recibida</h2>
          <p><strong>Titulo:</strong> ${title}</p>
          <p><strong>Categoria:</strong> ${category}</p>
          <p><strong>Nombre:</strong> ${requester}</p>
          <p><strong>Privacidad:</strong> ${privacy}</p>
          <p><strong>Estado:</strong> Pendiente de revision</p>
          <p>
            <a href="${panelUrl}" style="display:inline-block;background:#12384d;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:bold">
              Abrir panel de oracion
            </a>
          </p>
        </div>
      `
    });

    logger.info("Prayer notification email sent.", {
      requestId: event.params.requestId,
      to: prayerNotifyTo.value()
    });
  }
);
