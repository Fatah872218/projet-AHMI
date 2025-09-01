// src/middlewares/middlewareAuth.js
import jwt from "jsonwebtoken";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import Utilisateur from "../models/modeleUtilisateur.js";
import dotenv from "dotenv";
dotenv.config();

const middlewareAuth = async (req, res, next) => {
  try {
    // 1) Récupération du token : Authorization: Bearer xxx OU cookie httpOnly
    const auth = req.headers.authorization || "";
    const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    const cookieToken = req.cookies?.tokenA || req.cookies?.token || null;
    const token = bearer || cookieToken;

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // 2) Vérification du token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: "Token invalide ou expiré" });
    }

    // Accepte sub OU id (selon comment le JWT a été généré)
    const userId = payload?.sub || payload?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Token invalide (identifiant manquant)" });
    }

    // 3) Chargement de l'utilisateur via Repository si dispo, sinon fallback Mongoose
    const repo = new UtilisateurRepository();
    let utilisateur = null;
    if (repo.trouverParId) {
      utilisateur = await repo.trouverParId(userId);
    } else if (repo.findById) {
      utilisateur = await repo.findById(userId);
    }
    if (!utilisateur) {
      // Fallback direct DB
      utilisateur = await Utilisateur.findById(userId).select(
        "email role roles isActif"
      );
    }

    if (!utilisateur) {
      return res.status(401).json({ message: "Utilisateur inconnu" });
    }

    // 4) Vérifier l'activation du compte
    if (utilisateur.isActif === false) {
      return res.status(403).json({ message: "Compte non activé" });
    }

    // 5) Normaliser les rôles
    // - Certains schémas stockent un seul champ `role` (string)
    // - D'autres stockent `roles` (array d'ids ou de noms)
    const rolePrincipal = utilisateur.role || null;
    let roles = [];
    if (Array.isArray(utilisateur.roles)) {
      roles = utilisateur.roles;
    } else if (rolePrincipal) {
      roles = [rolePrincipal];
    }

    // 6) Hydrater req.utilisateur pour les middlewares suivants
    req.utilisateur = {
      id: (utilisateur._id || utilisateur.id).toString(),
      email: utilisateur.email,
      role: rolePrincipal,
      roles,
    };

    return next();
  } catch (err) {
    // Journaliser côté serveur sans divulguer les détails au client
    console.error("Erreur middlewareAuth :", err);
    return res.status(401).json({ message: "Authentification requise" });
  }
};

export default middlewareAuth;
