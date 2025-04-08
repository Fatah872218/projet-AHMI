import jwt from "jsonwebtoken";
import argon2 from "argon2";
import ServiceAuth from "../services/serviceAuth.js";
import dotenv from "dotenv";

dotenv.config();

class ControleurAuth {
  constructor() {
    this.serviceAuth = new ServiceAuth();
  }

  async inscription(req, res) {
    const { nom, email, motDePasse } = req.body;
    if (!nom || !email || !motDePasse) {
      return res.status(400).json("Erreur, l'un des champs est vide");
    }
    try {
      const utilisateur = await this.serviceAuth.inscrireUtilisateur({
        nom,
        email,
        motDePasse,
      });
      res.status(201).json(utilisateur);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async connexion(req, res) {
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
  }

  async deconnecter(req, res) {
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
  }

  async motDePasseOublie(req, res) {
    const { email } = req.body;
    try {
      await this.serviceAuth.envoyerEmailReinitialisation(email);
      res.status(200).json("Email de réinitialisation envoyé");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ControleurAuth();
