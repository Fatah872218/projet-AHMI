// backend/src/config/nodemailerConfig.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// === Transporter prêt à l’emploi — compatible Mailtrap ===
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.EMAIL_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // ad45c84a751142 …
    pass: process.env.EMAIL_PASS, // 8c3b…
  },
});
/* ---  helper réutilisable --------------------------- */
export async function sendConfirmationEmail(to, subject, html) {
  return transporter.sendMail({
    from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
/* -------------------------------------------------------------- */

export default transporter; // ⬅️  on exporte **l’instance**
