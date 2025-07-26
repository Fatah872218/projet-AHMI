// services/serviceReinitialisationMDP.js
import UtilisateurRepo from "../repositories/repositoryUtilisateur.js";
import argon2 from "argon2";
import crypto from "crypto";

import transporter from "../config/nodemailerConfig.js"; // ✅ instance prête

const utilisateurRepo = new UtilisateurRepo();
export default class ServiceReinitialisationMDP {
  /** Étape 1 : demande de reset */
  async demanderReinitialisation(email) {
    const utilisateur = await utilisateurRepo.trouverParEmail(email);
    if (!utilisateur) throw new Error("Utilisateur introuvable");

    const token = crypto.randomBytes(32).toString("hex");
    const expiration = Date.now() + 60 * 60 * 1000; // 1 h

    await utilisateurRepo.definirTokenReinitialisation(
      email,
      token,
      expiration
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reinitialiser-mot-de-passe?token=${token}`;

    await transporter.sendMail({
      from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez <a href="${resetUrl}">ici</a> ou copiez le lien suivant : ${resetUrl}</p>
        <p>Ce lien expire dans 1 heure.</p>`,
    });
  }

  /** Étape 2 : changement effectif */
  async reinitialiserMotDePasse(token, nouveauMotDePasse) {
    const utilisateur = await utilisateurRepo.trouverParTokenReinitialisation(
      token
    );
    if (
      !utilisateur ||
      utilisateur.expirationTokenReinitialisation < Date.now()
    ) {
      throw new Error("Lien invalide ou expiré");
    }

    utilisateur.motDePasse = await argon2.hash(nouveauMotDePasse);
    utilisateur.tokenReinitialisation = undefined;
    utilisateur.expirationTokenReinitialisation = undefined;
    await utilisateur.save();
  }
}
