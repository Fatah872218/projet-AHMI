// services/serviceReinitialisationMDP.js
import UtilisateurRepo from "../repositories/repositoryUtilisateur.js";
import argon2 from "argon2";
import crypto from "crypto";

<<<<<<< HEAD
import { sendMail } from "../config/nodemailerConfig.js";
=======
import transporter from "../config/nodemailerConfig.js"; // ✅ instance prête
>>>>>>> feature/events-booking

const utilisateurRepo = new UtilisateurRepo();
export default class ServiceReinitialisationMDP {
  /** Étape 1 : demande de reset */
  async demanderReinitialisation(email) {
    const utilisateur = await utilisateurRepo.trouverParEmail(email);
<<<<<<< HEAD
    if (!utilisateur) {
      // On ne révèle pas si l'email existe ou non : réponse 200 uniforme
      return {
        ok: true,
        message: "Si un compte existe pour cet email, un lien a été envoyé.",
      };
    }
=======
    if (!utilisateur) throw new Error("Utilisateur introuvable");
>>>>>>> feature/events-booking

    const token = crypto.randomBytes(32).toString("hex");
    const expiration = Date.now() + 60 * 60 * 1000; // 1 h

    await utilisateurRepo.definirTokenReinitialisation(
      email,
      token,
      expiration
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reinitialiser-mot-de-passe?token=${token}`;

<<<<<<< HEAD
    await sendMail({
=======
    await transporter.sendMail({
      from: `"${process.env.EMAIL_SENDER_NAME}" <${process.env.EMAIL_USER}>`,
>>>>>>> feature/events-booking
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez <a href="${resetUrl}">ici</a> ou copiez le lien suivant : ${resetUrl}</p>
        <p>Ce lien expire dans 1 heure.</p>`,
    });
<<<<<<< HEAD
    return {
      ok: true,
      message: "Email de réinitialisation envoyé s’il existe.",
    };
=======
>>>>>>> feature/events-booking
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
<<<<<<< HEAD
    return { ok: true, message: "Mot de passe réinitialisé." };
=======
>>>>>>> feature/events-booking
  }
}
