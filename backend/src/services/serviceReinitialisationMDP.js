// services/serviceReinitialisationMDP.js
import UtilisateurRepo from "../repositories/repositoryUtilisateur.js";
import argon2 from "argon2";
import crypto from "crypto";

import { sendMail } from "../config/nodemailerConfig.js";

const utilisateurRepo = new UtilisateurRepo();
export default class ServiceReinitialisationMDP {
  /** Étape 1 : demande de reset */
  async demanderReinitialisation(email) {
    const utilisateur = await utilisateurRepo.trouverParEmail(email);
    if (!utilisateur) {
      // On ne révèle pas si l'email existe ou non : réponse 200 uniforme
      return {
        ok: true,
        message: "Si un compte existe pour cet email, un lien a été envoyé.",
      };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiration = Date.now() + 60 * 60 * 1000; // 1 h

    await utilisateurRepo.definirTokenReinitialisation(
      email,
      token,
      expiration
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reinitialiser-mot-de-passe?token=${token}`;

    await sendMail({
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez <a href="${resetUrl}">ici</a> ou copiez le lien suivant : ${resetUrl}</p>
        <p>Ce lien expire dans 1 heure.</p>`,
    });
    return {
      ok: true,
      message: "Email de réinitialisation envoyé s’il existe.",
    };
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
    utilisateur.tokenReinitialisation = null;
    utilisateur.expirationTokenReinitialisation = null;
    await utilisateur.save();
    return { ok: true, message: "Mot de passe réinitialisé." };
  }
}
