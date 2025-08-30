// backend/src/config/nodemailerConfig.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, NODE_ENV } =
  process.env;

if (!SMTP_USER || !SMTP_PASS) {
  console.error("❌ SMTP_USER / SMTP_PASS manquants. Vérifie ton .env");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(SMTP_PORT) || 2525,
  secure: false, // Mailtrap sandbox: STARTTLS optionnel
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  debug: NODE_ENV !== "production",
});

// Vérifie la connexion SMTP au démarrage (log propre)
transporter.verify((err) => {
  if (err) console.error("❌ SMTP verify error:", err);
  else console.log("✅ SMTP ready");
});

// Helper générique
export async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: SMTP_FROM || "AHMI <no-reply@ahmi.local>",
    to,
    subject,
    html,
    text,
  });
}

// Alias de compatibilité si d’autres modules l’utilisent déjà
export async function sendConfirmationEmail(to, subject, html) {
  return sendMail({ to, subject, html });
}

export default transporter;
