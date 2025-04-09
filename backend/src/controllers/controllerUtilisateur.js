import UtilisateurService from "../services/serviceUtilisateur.js";
import Role from "../models/modeleRole.js";
import Utilisateur from "../models/modeleUtilisateur.js";

class ControleurUtilisateur {
  constructor() {
    this.utilisateurService = UtilisateurService;
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
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Aucune donnée à mettre à jour." });
    }

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

  async assignerRole(req, res) {
    try {
      const utilisateur = await Utilisateur.findById(req.params.id);
      if (!utilisateur) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const role = await Role.findOne({ nom: req.body.nomRole });
      if (!role) {
        return res.status(404).json({ message: "Rôle non trouvé" });
      }

      // évite doublon si le rôle existe déjà
      const dejaAssigne = utilisateur.roles.includes(role._id);
      if (!dejaAssigne) {
        utilisateur.roles.push(role._id);
        await utilisateur.save();
      }

      res
        .status(200)
        .json({ message: "Rôle assigné avec succès", utilisateur });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur assignation rôle : " + err.message });
    }
  }
}
export default new ControleurUtilisateur();
