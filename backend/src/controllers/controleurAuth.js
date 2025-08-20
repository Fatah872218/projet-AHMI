import jwt from "jsonwebtoken";
import argon2 from "argon2";
import ServiceAuth from "../services/serviceAuth.js";
import dotenv from "dotenv";
import Utilisateur from "../models/modeleUtilisateur.js";
import ServiceReinitialisationMDP from "../services/serviceReinitialisationMDP.js";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";

dotenv.config();

class ControleurAuth {
  constructor() {
    this.serviceAuth = new ServiceAuth();
    this.serviceReset = new ServiceReinitialisationMDP();
    this.utilisateurRepo = new UtilisateurRepository();
  }

  // Inscription
  inscription = async (req, res, next) => {
    try {
      const { utilisateur, token } = await this.serviceAuth.inscrireUtilisateur(
        req.body
      );

      res.cookie("tokenA", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 3600 * 1000),
      });

      res.status(201).json({ utilisateur, token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  // Connexion
  connexion = async (req, res) => {
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse) {
      return res.status(400).json("Erreur, l'un des champs est vide");
    }

    try {
      const { utilisateur, token } =
        await this.serviceAuth.connecterUtilisateur(email, motDePasse);

      res.cookie("tokenA", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 36000 * 1000), // 10 heures
      });

      res.status(200).json({ utilisateur, token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  };

  // Déconnexion
  deconnecter = async (req, res) => {
    try {
      res.clearCookie("tokenA", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Mot de passe oublié
  motDePasseOublie = async (req, res, next) => {
    try {
      const { email } = req.body;
      const utilisateur = await this.utilisateurRepo.trouverParEmail(email);
      if (!utilisateur)
        return res.status(404).json({ message: "Utilisateur introuvable" });

      await this.serviceReset.demanderReinitialisation(email); // envoie l’e-mail
      return res.status(200).json({ message: "E-mail envoyé" });
    } catch (err) {
      next(err);
    }
  };
  /* ────────── Réinitialiser mot de passe ────────── */
  reinitialiserMotDePasse = async (req, res, next) => {
    try {
      const { token } = req.params;
      const { motDePasse } = req.body;

      const utilisateur =
        await this.utilisateurRepo.trouverParTokenReinitialisation(token);
      if (
        !utilisateur ||
        utilisateur.expirationTokenReinitialisation < Date.now()
      )
        return res
          .status(400)
          .json({ message: "Lien invalide ou expiré, recommencez." });

      const hash = await argon2.hash(motDePasse);
      await this.utilisateurRepo.reinitialiserMotDePasse(utilisateur._id, hash);

      return res.status(200).json({ message: "Mot de passe réinitialisé" });
    } catch (err) {
      next(err);
    }
  };
  /* ────────── Activation du compte ────────── */
  activerCompte = async (req, res) => {
    try {
      const { code } = req.params;

      // 1. Cherche l’utilisateur par son code
      const utilisateur = await Utilisateur.findOne({ activationCode: code });
      if (!utilisateur) {
        return res.status(400).json({ message: "Lien invalide." });
      }

      // 2. Déjà activé ?
      if (utilisateur.isActif) {
        return res.status(200).json({ message: "Compte déjà activé." });
      }

      // 3. Active le compte et supprime le code
      utilisateur.isActif = true;
      utilisateur.activationCode = undefined;
      await utilisateur.save();

      return res.status(200).json({ message: "Compte activé avec succès." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default new ControleurAuth();
