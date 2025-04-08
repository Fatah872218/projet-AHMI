//  Contrôleur pour gérer les opérations d'authentification.
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Utilisateur from "../models/modeleUtilisateur.js";
import serviceAuth from "../services/serviceAuth.js";
import dotenv from "dotenv";

dotenv.config();

class ControleurAuth {
  async inscription(req, res) {
    const { nom, email, motDePasse } = req.body;
    try {
      const hash = await argon2.hash(motDePasse);
      const utilisateur = new Utilisateur({ nom, email, motDePasse: hash });
      await utilisateur.save();
      res.status(201).send("Utilisateur créé");
    } catch (err) {
      res.status(400).send("Erreur lors de l'inscription");
    }
  }

  async connexion(req, res) {
    const { email, motDePasse } = req.body;
    try {
      const utilisateur = await Utilisateur.findOne({ email });
      if (
        utilisateur &&
        (await argon2.verify(utilisateur.motDePasse, motDePasse))
      ) {
        const token = jwt.sign(
          { id: utilisateur._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRES_IN }
        );
        res.status(200).json({ token });
      } else {
        res.status(401).send("Identifiants invalides");
      }
    } catch (err) {
      res.status(500).send("Erreur serveur");
    }
  }

  async motDePasseOublie(req, res) {
    const { email } = req.body;
    try {
      await serviceAuth.envoyerEmailReinitialisation(email);
      res.status(200).send("Email de réinitialisation envoyé");
    } catch (err) {
      res.status(500).send("Erreur lors de l'envoi de l'email");
    }
  }
}

export default new ControleurAuth();
