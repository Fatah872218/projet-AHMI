import jwt from "jsonwebtoken";
import argon2 from "argon2";
import ServiceAuth from "../services/serviceAuth.js";
import dotenv from "dotenv";

dotenv.config();

class ControleurAuth {
  constructor() {
    this.serviceAuth = new ServiceAuth();
  }
  //comment s'inscrire:
  async inscription(req, res) {
    console.log(req.body.nom);
    const { nom, email, motDePasse } = req.body;
    //if (!req.body.nom || !req.body.email || !req.body.motDePasse){
    if (!nom || !email || !motDePasse) {
      return res.status(400).json("Erreur, l'un des champs est vide");
    }
    try {
      //const dataUtilisateur = req.body
      const utilisateur = await this.serviceAuth.inscrireUtilisateur(
        {
          nom,
          email,
          motDePasse,
        }
        //dataUtilisateur
      );
      // Vérifiez si le mot de passe existe avant de le supprimer
      /* if (utilisateur.motDePasse) {
          delete utilisateur.motDePasse
        } */
      res.status(201).json(utilisateur);
      console.info("l utilisateur est cree");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  //comment se connecter:
  async connexion(req, res) {
    const { email, motDePasse } = req.body;
    // verifier si l'utilisateur existe dans le body
    //if (!req.body.email || !req.body.motDePasse) {
    if (!email || !motDePasse) {
      return res.status(400).json("Erreur, l'un des champs est vide");
    }
    try {
      //const { email, motDePasse } = req.body
      const { utilisateur, token } =
        await this.serviceAuth.connecterUtilisateur(email, motDePasse);
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
