// Service pour encapsuler la logique d'authentification.
import nodemailer from "nodemailer";
import Utilisateur from "../models/modeleUtilisateur.js";
import dotenv from "dotenv";

dotenv.config();

class ServiceAuth {
  async envoyerEmailReinitialisation(email) {
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) throw new Error("Utilisateur non trouvé");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "votre-email@gmail.com",
        pass: "votre-mot-de-passe",
      },
    });

    const mailOptions = {
      from: "votre-email@gmail.com",
      to: email,
      subject: "Réinitialisation de mot de passe",
      text: "Cliquez sur le lien pour réinitialiser votre mot de passe",
    };

    await transporter.sendMail(mailOptions);
  }
}

export default new ServiceAuth();
