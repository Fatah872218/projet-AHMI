import express from "express";
import controleurAuth from "../controllers/controleurAuth.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  schemaInscription,
  schemaConnexion,
} from "../validations/schemasUtilisateur.js";
import {
  schemaDemandeReinitialisation,
  schemaReinitialisationMDP,
} from "../validations/validationAuth.js";

const router = express.Router();

// Inscription / Connexion
router.post(
  "/inscription",
  valider(schemaInscription),
  controleurAuth.inscription
);
router.post("/connexion", valider(schemaConnexion), controleurAuth.connexion);

// Mot de passe oublié / Réinitialiser
router.post(
  "/mot-de-passe-oublie",
  valider(schemaDemandeReinitialisation),
  controleurAuth.motDePasseOublie
);
router.post(
  "/reinitialiser/:token",
  valider(schemaReinitialisationMDP),
  controleurAuth.reinitialiserMotDePasse
);

// Activation compte
router.get("/activation/:code", controleurAuth.activerCompte);

// Déconnexion
router.post("/deconnexion", controleurAuth.deconnecter);

export default router;
