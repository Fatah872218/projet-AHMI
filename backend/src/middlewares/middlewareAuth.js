// src/middlewares/middlewareAuth.js
import jwt from "jsonwebtoken";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import dotenv from "dotenv";
dotenv.config();

const middlewareAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Token manquant" });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: "Token invalide" });
    }

    const repo = new UtilisateurRepository();
    const utilisateur =
      (repo.trouverParId && (await repo.trouverParId(payload.id))) ||
      (repo.findById && (await repo.findById(payload.id)));

    if (!utilisateur)
      return res.status(401).json({ message: "Utilisateur inconnu" });

    // Harmoniser : expose un tableau de rôles
    const roles = Array.isArray(utilisateur.roles) ? utilisateur.roles : [];
    req.utilisateur = { id: utilisateur._id.toString(), roles };

    next();
  } catch (err) {
    console.error("Erreur JWT :", err);
    return res.status(401).json({ message: "Authentification requise" });
  }
};

export default middlewareAuth;
