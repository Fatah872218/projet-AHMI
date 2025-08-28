// backend/src/config/nodemailerConfig.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

<<<<<<< HEAD
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

if (!SMTP_USER || !SMTP_PASS) {
  console.error("❌ SMTP_USER / SMTP_PASS manquants. Vérifie ton .env");
}

=======
// === Transporter prêt à l’emploi — compatible Mailtrap ===
>>>>>>> feature/events-booking
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false,
<<<<<<< HEAD
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
=======
  auth: {
    user: process.env.SMTP_USER, // ad45c84a751142 …
    pass: process.env.SMTP_PASS, // 8c3b…
  },
>>>>>>> feature/events-booking
});
/* ---  helper réutilisable --------------------------- */
export async function sendConfirmationEmail(to, subject, html) {
  return transporter.sendMail({
    from: `"${process.env.SMTP_FROM || "AHMI"}"  <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}
/* -------------------------------------------------------------- */

<<<<<<< HEAD
/** Helper commun */
export async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}
transporter.verify((err, success) => {
  if (err) console.error("❌ SMTP verify error:", err);
  else console.log("✅ SMTP ready");
});

export default transporter;
=======
export default transporter; // ⬅️  on exporte **l’instance**
>>>>>>> feature/events-booking
