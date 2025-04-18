import jwt from "jsonwebtoken";
import ServiceAuth from "../services/serviceAuth.js";
import dotenv from "dotenv";
import Utilisateur from "../models/modeleUtilisateur.js";

dotenv.config();

class ControleurAuth {
  constructor() {
    this.serviceAuth = ServiceAuth;
  }

  // Inscription
  // Inscription
  inscription = async (req, res) => {
    const { nom, email, motDePasse } = req.body;
    if (!nom || !email || !motDePasse) {
      return res.status(400).json("Erreur, l'un des champs est vide");
    }

    try {
      // 🔒 Vérifie si l'utilisateur existe déjà
      const utilisateurExistant = await Utilisateur.findOne({ email });
      if (utilisateurExistant) {
        return res
          .status(400)
          .json({ message: "Cet utilisateur existe déjà." });
      }

      const { utilisateur, token } = await this.serviceAuth.inscrireUtilisateur(
        {
          nom,
          email,
          motDePasse,
        }
      );

      res.cookie("tokenA", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 36000),
      });

      res.status(201).json(utilisateur);

      console.info("Utilisateur créé avec succès");
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
        expires: new Date(Date.now() + 36000),
      });

      res.status(200).json(utilisateur);
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

  // Mot de passe oublié (non implémenté encore)
  motDePasseOublie = async (req, res) => {
    const { email } = req.body;
    try {
      await this.serviceAuth.envoyerEmailReinitialisation(email);
      res.status(200).json("Email de réinitialisation envoyé");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default new ControleurAuth();
