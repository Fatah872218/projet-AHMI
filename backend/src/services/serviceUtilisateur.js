import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import dotenv from "dotenv";

//import cookieParser from "cookie-parser";

// Charger les variables d'environnement
dotenv.config();

class ServiceUtilisateur {
  constructor() {
    this.utilisateurRepository = new UtilisateurRepository();
  }

  // Méthode pour récupérer un utilisateur par son email
  async getUtilisateurByEmail(email) {
    const utilisateur = await this.utilisateurRepository.findByEmail(email);
    if (!utilisateur) throw new Error("Utilisateur non trouvé");
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
        `Erreur lors de la mise à jour de l'utilisateur : ${err.message}`
      );
    }
  }
  //supression:
  async deleteUtilisateur(id) {
    try {
      return await this.utilisateurRepository.deleteU(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la suppression de l'utilisateur : ${err.message}`
      );
    }
  }
}

// Exporter la classe entière
//export default UtilisateurService;
export default new ServiceUtilisateur();
