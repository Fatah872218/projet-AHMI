//Fichier pour définir les routes liées à l'authentification.
import express from "express";
import controleurAuth from "../controllers/controleurAuth.js";

const router = express.Router();

//router.post("/inscription", controleurAuth.inscription);
router.post("/connexion", controleurAuth.connexion);
router.post("/mot-de-passe-oublie", controleurAuth.motDePasseOublie);

export default router;
