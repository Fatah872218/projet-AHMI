// services/serviceReinitialisationMDP.js
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import argon2 from "argon2";
import crypto from "crypto";
import nodemailer from "nodemailer";

class ServiceReinitialisationMDP {
  constructor() {
    this.utilisateurRepo = new UtilisateurRepository();
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async demanderReinitialisation(email) {
    const utilisateur = await this.utilisateurRepo.findByEmail(email);
    if (!utilisateur) {
      throw new Error("Aucun utilisateur trouvé avec cet email");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiration = Date.now() + 3600000; // 1 heure

    await this.utilisateurRepo.definirTokenReinitialisation(
      email,
      token,
      expiration
    );

    const urlReinitialisation = `${process.env.FRONTEND_URL}/reinitialiser-mot-de-passe?token=${token}`;

    await this.transporter.sendMail({
      to: utilisateur.email,
      from: process.env.EMAIL_USER,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p><a href="${urlReinitialisation}">Cliquez ici pour définir un nouveau mot de passe</a></p>
        <p>Ce lien expirera dans 1 heure.</p>
      `,
    });

    return { succes: true };
  }

  async reinitialiserMotDePasse(token, nouveauMotDePasse) {
    const utilisateur =
      await this.utilisateurRepo.trouverParTokenReinitialisation(token);
    if (!utilisateur) {
      throw new Error("Lien invalide ou expiré");
    }

    const motDePasseHache = await argon2.hash(nouveauMotDePasse);
    await this.utilisateurRepo.reinitialiserMotDePasse(
      utilisateur._id,
      motDePasseHache
    );

    return { succes: true };
  }
}

export default ServiceReinitialisationMDP;
