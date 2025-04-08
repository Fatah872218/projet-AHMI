//Contrôleur pour gérer les opérations CRUD sur les utilisateurs.
import UtilisateurService from "../services/servicesUtilisateur.js";

class ControleurUtilisateur {
  constructor() {
    this.utilisateurService = new UtilisateurService();
  }

  async obtenirProfil(req, res) {
    try {
      const utilisateur = await this.utilisateurService.getUtilisateurById(
        req.utilisateur.id
      );
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async mettreAJourProfil(req, res) {
    try {
      const utilisateur = await this.utilisateurService.updateUtilisateur(
        req.utilisateur.id,
        req.body
      );
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async supprimerUtilisateur(req, res) {
    try {
      await this.utilisateurService.deleteUtilisateur(req.params.id);
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ControleurUtilisateur();
