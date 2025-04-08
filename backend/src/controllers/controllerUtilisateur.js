import UtilisateurService from "../services/serviceUtilisateur.js";

class ControleurUtilisateur {
  constructor() {
    this.utilisateurService = new UtilisateurService();
  }
  // Récupérer l'utilisateur connecté
  async obtenirProfil(req, res) {
    try {
      const utilisateur = await this.utilisateurService.getUtilisateurById(
        //req.body._id
        req.utilisateur.id
      );
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  //mise a jour
  async mettreAJourProfil(req, res) {
    try {
      const utilisateur = await this.utilisateurService.updateUtilisateur(
        //req.params.id,
        req.utilisateur.id,
        req.body
      );
      console.log("Données reçues :", req.body);
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // supprimer un utilisateur:
  async supprimerUtilisateur(req, res) {
    try {
      await this.utilisateurService.deleteUtilisateur(req.params.id);
      res.status(200).json({ message: "utilisateur supprimée avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
export default new ControleurUtilisateur();
