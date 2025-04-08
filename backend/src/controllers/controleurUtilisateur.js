//Contrôleur pour gérer les opérations CRUD sur les utilisateurs.
import Utilisateur from "../models/Utilisateur.js";

class ControleurUtilisateur {
  async obtenirProfil(req, res) {
    try {
      const utilisateur = await Utilisateur.findById(req.utilisateur.id);
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  }

  async mettreAJourProfil(req, res) {
    const { nom, email } = req.body;
    try {
      const utilisateur = await Utilisateur.findByIdAndUpdate(
        req.utilisateur.id,
        { nom, email },
        { new: true }
      );
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(500).send("Erreur lors de la mise à jour du profil");
    }
  }
}

export default new ControleurUtilisateur();
