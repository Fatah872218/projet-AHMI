// backend/src/config/nodemailerConfig.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// === Transporter prêt à l’emploi — compatible Mailtrap ===
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // ad45c84a751142 …
    pass: process.env.SMTP_PASS, // 8c3b…
  },
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

export default transporter; // ⬅️  on exporte **l’instance**
