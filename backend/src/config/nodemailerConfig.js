// backend/src/config/nodemailerConfig.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const trimEndSlash = (s) => (s || "").replace(/\/+$/, "");
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, NODE_ENV } =
  process.env;

if (!SMTP_USER || !SMTP_PASS) {
  console.error(" SMTP_USER / SMTP_PASS manquants. Vérifie ton .env");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false, // Mailtrap sandbox: STARTTLS optionnel
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  debug: NODE_ENV !== "production",
});

// Vérifie la connexion SMTP au démarrage (log propre)
transporter.verify((err) => {
  if (err) console.error(" SMTP verify error:", err);
  else console.log("SMTP ready");
});

// Helper générique
export async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM || "AHMI <no-reply@ahmi.local>",
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
// Envoi e-mail d'activation
export async function envoyerEmailActivation(to, code) {
  const base = trimEndSlash(
    process.env.FRONTEND_URL || "http://localhost:5173"
  );
  const url = `${base}/activation/${code}`;
  const subject = "Active ton compte AHMI";
  const html = `
  <p>Bienvenue !</p>
  <p>Pour activer ton compte, clique sur le lien ci-dessous :</p>
  <p><a href="${url}">${url}</a></p>
  <p>Ce lien expire dans 24 heures.</p>
  `;
  const text = `Active ton compte: ${url}`;
  const info = await sendMail({ to, subject, html, text });

  // Log en DEV pour faciliter les tests (Mailtrap peut être désactivé)
  if (NODE_ENV !== "production") {
    console.log("🔗 Lien d’activation :", url);
    console.log(" Email envoyé (info):", info);
  }
  return info;
}
export default transporter;
