// middlewareAuth.js
import jwt from "jsonwebtoken";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware réel pour authentifier les utilisateurs via JWT
const middlewareAuth = async (req, res, next) => {
  // Mode développement : token spécial pour simuler un admin
  //if (token === "FAUX_TOKEN_TEST_DEV") {
  // req.utilisateur = { id: "64cd1f4c3b278baf7f0a6c93", role: "admin" };
  //return next();
  // }

  try {
    const auth = req.headers.authorization || "";
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Token manquant" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const repository = new UtilisateurRepository();
    const utilisateur = await repository.findById(decoded.id);

    if (!utilisateur)
      return res.status(401).json({ message: "Utilisateur inconnu" });

    req.utilisateur = {
      id: utilisateur._id.toString(),
      role: utilisateur.role,
    };
    next();
  } catch (err) {
    console.error("Erreur JWT :", err);
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default middlewareAuth;
