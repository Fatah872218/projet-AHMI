import express from "express";
import controleurAuth from "../controllers/controleurAuth.js";

const router = express.Router();

router.post("/inscription", controleurAuth.inscription);
//router.post("/auth/register", (req, res) =>
// utilisateurController.inscrire(req, res)
//)
router.post("/connexion", controleurAuth.connexion);
//router.post("/auth/login", (req, res) =>
// utilisateurController.connecter(req, res)
//)
router.post("/mot-de-passe-oublie", controleurAuth.motDePasseOublie);

// Déconnexion
router.post("/deconnexion", controleurAuth.deconnecter);

export default router;
