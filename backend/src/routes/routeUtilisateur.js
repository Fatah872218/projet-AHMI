import express from "express";
import UtilisateurController from "../controllers/controllerUtilisateur.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";

const router = express.Router();
const utilisateurController = new UtilisateurController(); // Instancier la classe

// Récupérer l'utilisateur connecté (protégé par authMiddleware)
//router.get("/utilisateur", (req, res) =>
// utilisateurController.obtenirProfil(req, res)
//);
router.get("/profil", middlewareAuth, utilisateurController.obtenirProfil);
// modifier utilisateur:
//router.patch("/:id", (req, res) => utilisateurController.update(req, res));
router.put("/profil", middlewareAuth, utilisateurController.mettreAJourProfil);

// supprimer un utilisateur:
router.delete("/:id", (req, res) => utilisateurController.delete(req, res));

export default router;
