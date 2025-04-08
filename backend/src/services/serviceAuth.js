// Service pour encapsuler la logique d'authentification.
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import dotenv from "dotenv";

dotenv.config();

class ServiceAuth {
  constructor() {
    this.utilisateurRepository = new UtilisateurRepository();
  }

  async inscrireUtilisateur(utilisateurData) {
    try {
      const utilisateurExiste = await this.utilisateurRepository.findByEmail(
        utilisateurData.email
      );
      if (utilisateurExiste) throw new Error("Cet utilisateur existe déjà");

      utilisateurData.motDePasse = await argon2.hash(
        utilisateurData.motDePasse
      );
      return await this.utilisateurRepository.createUtilisateur(
        utilisateurData
      );
    } catch (err) {
      throw new Error(`Erreur lors de l'inscription : ${err.message}`);
    }
  }

  async connecterUtilisateur(email, motDePasse) {
    try {
      const utilisateur = await this.utilisateurRepository.findByEmail(email);
      if (!utilisateur) throw new Error("Utilisateur non trouvé");

      const motDePasseValide = await argon2.verify(
        utilisateur.motDePasse,
        motDePasse
      );
      if (!motDePasseValide) throw new Error("Mot de passe incorrect");

      const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { utilisateur, token };
    } catch (err) {
      throw new Error(`Erreur lors de la connexion : ${err.message}`);
    }
  }

  async envoyerEmailReinitialisation(email) {
    // Logique pour envoyer un email de réinitialisation
    // Utiliser un service de messagerie comme nodemailer
  }
}

export default new ServiceAuth();
