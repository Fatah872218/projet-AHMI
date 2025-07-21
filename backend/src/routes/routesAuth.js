import express from "express";
import controleurAuth from "../controllers/controleurAuth.js";

const router = express.Router();

router.post("/inscription", controleurAuth.inscription);

router.post("/connexion", controleurAuth.connexion);

router.post("/mot-de-passe-oublie", controleurAuth.motDePasseOublie);
router.post("/reinitialiser/:token", controleurAuth.reinitialiserMotDePasse);

// Déconnexion
router.post("/deconnexion", controleurAuth.deconnecter);

export default router;
