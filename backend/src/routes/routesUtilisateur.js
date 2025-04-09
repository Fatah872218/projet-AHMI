// Fichier pour définir les routes liées à la gestion des utilisateurs.
import express from "express";
import controleurUtilisateur from "../controllers/controleurUtilisateur.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";

const router = express.Router();

router.get("/profil", middlewareAuth, controleurUtilisateur.obtenirProfil);
router.put("/profil", middlewareAuth, controleurUtilisateur.mettreAJourProfil);

export default router;
