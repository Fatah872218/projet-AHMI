// backend/src/config/nodemailerConfig.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const trimEndSlash = (s) => (s || "").replace(/\/+$/, "");

const {
  NODE_ENV,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  FRONTEND_URL,
} = process.env;

// Transporteur : en test => pas d'appel réseau ; sinon => SMTP normal (Mailtrap par défaut)
const transporter =
  NODE_ENV === "test"
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: SMTP_HOST || "sandbox.smtp.mailtrap.io",
        port: Number(SMTP_PORT) || 2525,
        secure: false, // STARTTLS avec Mailtrap
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        debug: NODE_ENV !== "production",
      });

// Vérification SMTP uniquement hors test
if (NODE_ENV !== "test") {
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("SMTP_USER / SMTP_PASS manquants. Vérifie ton .env");
  }
  transporter.verify((err) => {
    if (err) console.error("SMTP verify error:", err);
    else console.log("SMTP ready");
  });
}

// Helper d'envoi générique
export async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: SMTP_FROM || "AHMI <no-reply@ahmi.local>",
    to,
    subject,
    html,
    text,
  });
}

// Alias compat (si d'autres modules l'appellent déjà)
export async function sendConfirmationEmail(to, subject, html) {
  return sendMail({ to, subject, html });
}

// Envoi e-mail d'activation
export async function envoyerEmailActivation(to, code) {
  const base = trimEndSlash(FRONTEND_URL || "http://localhost:5173");
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

  if (NODE_ENV !== "production") {
    console.log("🔗 Lien d’activation :", url);
    console.log("Email envoyé (info):", info);
  }
  return info;
}

export default transporter;
