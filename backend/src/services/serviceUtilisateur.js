import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import argon2 from "argon2";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

class UtilisateurService {
  constructor() {
    this.utilisateurRepository = new UtilisateurRepository();
  }
  //authentification (inscription et connexion:)
  // s inscrire:
  async inscrireUtilisateur(utilisateurData) {
    try {
      const utilisateurExiste = await this.utilisateurRepository.findByEmail(
        utilisateurData.email
      );

      if (utilisateurExiste)
        throw new Error(
          ` erreur : cet utilisateur existe déjà dans la base de donnée`
        );
      //etape1:hachage de mot de passe:
      utilisateurData.motDePasse = await argon2.hash(
        utilisateurData.motDePasse
      );
      console.log("mot de passe hachee:", utilisateurData.motDePasse);
      return await this.utilisateurRepository.createUtilisateur(
        utilisateurData
      );
    } catch (err) {
      throw new Error(
        `Erreur lors de l'inscription de l'utilisateur : ${err.message}`
      );
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
      // Générer un token JWT
      // const token = jwt.sign(payload, 'votre_clé_secrète', { expiresIn: '1h' });
      const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      /* console.log("Token généré :", token); */
      return { utilisateur, token };
    } catch (err) {
      throw new Error(
        `Erreur lors de la connexion de l'utilisateur : ${err.message}`
      );
    }
  }
  //---------------------------fin athentification----------------------------------------------------------------------------------------------------------------
  // Méthode pour récupérer un utilisateur par son email
  async getUtilisateurByEmail(email) {
    const utilisateur = await this.utilisateurRepository.findByEmail(email);
    if (!utilisateur) {
      throw new Error("Utilisateur non trouvé"); // Si l'utilisateur n'est pas trouvé, une erreur est lancée
    }
    return utilisateur;
  }

  // Récupérer un utilisateur par son Id
  async getUtilisateurById(id) {
    try {
      return await this.utilisateurRepository.findById(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la récupération de l'utilisateur : ${err.message}`
      );
    }
  }
  // mise jour
  async updateUtilisateur(id, updateData) {
    try {
      return await this.utilisateurRepository.updateU(id, updateData);
    } catch (err) {
      throw new Error(
        `Erreur lors de la mise a jour de l'utilisateur : ${err.message}`
      );
    }
  }
  //supression:
  async deleteUtilisateur(id) {
    try {
      return await this.utilisateurRepository.deleteU(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la  supression de l'utilisateur : ${err.message}`
      );
    }
  }
}

// Exporter la classe entière
export default UtilisateurService;
