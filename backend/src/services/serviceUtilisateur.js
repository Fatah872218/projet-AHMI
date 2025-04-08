// Service pour encapsuler la logique de gestion des utilisateurs.
import Utilisateur from "../models/modeleUtilisateur.js";

class ServiceUtilisateur {
  async obtenirUtilisateurParId(id) {
    return await Utilisateur.findById(id);
  }

  async mettreAJourUtilisateur(id, donnees) {
    return await Utilisateur.findByIdAndUpdate(id, donnees, { new: true });
  }
}

export default new ServiceUtilisateur();
