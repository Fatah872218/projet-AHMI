import Utilisateur from "../models/modeleUtilisateur.js";

class UtilisateurRepository {
  async trouverParEmail(email) {
    return await Utilisateur.findOne({ email });
  }

  async sauvegarder(utilisateur) {
    return await utilisateur.save();
  }
}

export default new UtilisateurRepository();
