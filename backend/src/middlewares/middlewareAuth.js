// middlewareAuth.js
import jwt from "jsonwebtoken";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware réel pour authentifier les utilisateurs via JWT
const middlewareAuth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Accès refusé. Aucun token fourni.");

  // Mode développement : token spécial pour simuler un admin
  if (token === "FAUX_TOKEN_TEST_DEV") {
    req.utilisateur = { id: "64cd1f4c3b278baf7f0a6c93", role: "admin" };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const repository = new UtilisateurRepository();
    const utilisateur = await repository.findById(decoded.id);

    if (!utilisateur) return res.status(404).send("Utilisateur non trouvé");

    req.utilisateur = {
      id: utilisateur._id.toString(),
      role: utilisateur.role,
    };
    next();
  } catch (err) {
    console.error("Erreur JWT :", err);
    res.status(400).send("Token invalide");
  }
};

export default middlewareAuth;
