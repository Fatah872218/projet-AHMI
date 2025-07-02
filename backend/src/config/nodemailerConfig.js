import nodemailer from "nodemailer";
import dotenv from "dotenv";
// Charger les variables d'environnement
dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Pour éviter les erreurs de certificat auto-signé
    },
  });
};

export const sendConfirmationEmail = async (email, nom, activationCode) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`, // Nom de l'expéditeur
    to: email,
    subject: "Veuillez activer votre compte",
    html: ` 
      <div>
      <h1>Activation du compte</h1>
        <h2>Bonjour ${nom}</h2>
        <p>Veuillez confirmer votre email en cliquant sur le lien suivant</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${activationCode}">Cliquez ici</a>
        <ul>
          <li>Votre nom d'utilisateur : ${nom}</li>
          <li>Votre mot de passe : ${process.env.EMAIL_PASS}</li>
        </ul>
      </div>`,
  };
  try {
    // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error(`Erreur lors de l'envoi de l'email : ${err.message}`);
  }
};
