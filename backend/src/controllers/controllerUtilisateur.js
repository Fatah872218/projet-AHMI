import UtilisateurService from "../services/serviceUtilisateur.js";

class UtilisateurController {
  constructor() {
    this.utilisateurService = new UtilisateurService();
  }
  //comment s'inscrire:
  async inscrire(req, res) {
    console.log(req.body.nom);
    if (!req.body.nom || !req.body.email || !req.body.motDePasse) {
      res.status(400).json(`erreur ,l'un des champ est vide`);
    } else {
      try {
        const dataUtilisateur = req.body;
        const utilisateur = await this.utilisateurService.inscrireUtilisateur(
          dataUtilisateur
        );
        // Vérifiez si le mot de passe existe avant de le supprimer
        /* if (utilisateur.motDePasse) {
          delete utilisateur.motDePasse;
        } */

        console.log(utilisateur.motDePasse);

        res.status(201).json(utilisateur);
        console.info("l utilisateur est cree");
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  }
  //comment se connecter:
  async connecter(req, res) {
    // verifier si l'utilisateur existe dans le body
    if (!req.body.email || !req.body.motDePasse) {
      res.status(400).json(`erreur ,l'un des champ est vide`);
    } else {
      try {
        const { email, motDePasse } = req.body;
        const { utilisateur, token } =
          await this.utilisateurService.connecterUtilisateur(
            /* req.body.email,
          req.body.motDePasse */
            email,
            motDePasse
          );

        // Envoyer le token dans un cookie:("tokenA" cest le nom de cookie)
        res.cookie("tokenA", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Cookie sécurisé uniquement en production
          sameSite: "strict",
          expires: new Date(Date.now() + 36000),
        });
        res.status(200).json(utilisateur);
      } catch (err) {
        res.status(401).json({ message: err.message });
      }
    }
  }
  // Récupérer l'utilisateur connecté
  async getUtilisateur(req, res) {
    try {
      const utilisateur = await this.utilisateurService.getUtilisateurById(
        req.body._id
      );
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  //mise a jour
  async update(req, res) {
    try {
      const utilisateur = await this.utilisateurService.updateUtilisateur(
        req.params.id,
        req.body
      );
      console.log("Données reçues :", req.body);
      res.status(200).json(utilisateur);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  // supprimer un utilisateur:
  async delete(req, res) {
    try {
      await this.utilisateurService.deleteUtilisateur(req.params.id);
      res.status(200).json({ message: "utilisateur supprimée avec succès" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  // comment se deconnecter:
  async deconnecter(req, res) {
    try {
      res.clearCookie("tokenA", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Cookie sécurisé uniquement en production
        sameSite: "strict",
      });
      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

// Exporter la classe entière
export default UtilisateurController;
