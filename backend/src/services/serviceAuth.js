import jwt from "jsonwebtoken";
import argon2 from "argon2";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import dotenv from "dotenv";
//import cookieParser from "cookie-parser";

// Charger les variables d'environnement
dotenv.config();

class ServiceAuth {
  constructor() {
    this.utilisateurRepository = new UtilisateurRepository();
  }
  //authentification (inscription)
  async inscrireUtilisateur(utilisateurData) {
    try {
      const utilisateurExiste = await this.utilisateurRepository.findByEmail(
        utilisateurData.email
      );
      if (utilisateurExiste) throw new Error("Cet utilisateur existe déjà");
      //etape1:hachage de mot de passe:
      utilisateurData.motDePasse = await argon2.hash(
        utilisateurData.motDePasse
      );
      console.log("mot de passe hachee:", utilisateurData.motDePasse);
      return await this.utilisateurRepository.createUtilisateur(
        utilisateurData
      );
    } catch (err) {
      throw new Error(`Erreur lors de l'inscription : ${err.message}`);
    }
  }
  // se connecter
  async connecterUtilisateur(email, motDePasse) {
    try {
      const utilisateur = await this.utilisateurRepository.findByEmail(email);
      if (!utilisateur) throw new Error("Utilisateur non trouvé");

      const motDePasseValide = await argon2.verify(
        utilisateur.motDePasse,
        motDePasse
      );
      if (!motDePasseValide) throw new Error("Mot de passe incorrect");
      //Générer un token JWT
      // const token = jwt.sign(payload, 'votre_clé_secrète', { expiresIn: '1h' });
      const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      /* console.log("Token généré :", token); */
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
