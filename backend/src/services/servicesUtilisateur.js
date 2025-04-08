import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";

class ServiceUtilisateur {
  constructor() {
    this.utilisateurRepository = new UtilisateurRepository();
  }

  async getUtilisateurByEmail(email) {
    const utilisateur = await this.utilisateurRepository.findByEmail(email);
    if (!utilisateur) throw new Error("Utilisateur non trouvé");
    return utilisateur;
  }

  async getUtilisateurById(id) {
    try {
      return await this.utilisateurRepository.findById(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la récupération de l'utilisateur : ${err.message}`
      );
    }
  }

  async updateUtilisateur(id, updateData) {
    try {
      return await this.utilisateurRepository.updateU(id, updateData);
    } catch (err) {
      throw new Error(
        `Erreur lors de la mise à jour de l'utilisateur : ${err.message}`
      );
    }
  }

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

export default new ServiceUtilisateur();
