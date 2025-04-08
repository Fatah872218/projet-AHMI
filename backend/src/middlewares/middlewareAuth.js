// Middleware pour vérifier l'authentification et les permissions des utilisateurs.
import jwt from "jsonwebtoken";
import Utilisateur from "../models/modeleUtilisateur.js";
import dotenv from "dotenv";

dotenv.config();

const middlewareAuth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Accès refusé");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = decoded;
    const utilisateur = await Utilisateur.findById(decoded.id);
    if (!utilisateur) return res.status(404).send("Utilisateur non trouvé");
    next();
  } catch (ex) {
    res.status(400).send("Token invalide");
  }
};

export default middlewareAuth;
