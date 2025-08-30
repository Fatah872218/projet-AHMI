// backend/src/routes/routeReinitialisationMDP.js
import express from "express";
import ControllerReinitialisationMDP from "../controllers/controllerReinitialisationMDP.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  schemaDemandeReinitialisation,
  schemaReinitialisationMDP,
} from "../validations/validationAuth.js";

const router = express.Router();
const controller = new ControllerReinitialisationMDP();

/**
 * ETAPE 1 — Demande de réinitialisation
 * On garde ta route d’origine ET on ajoute l’alias utilisé par le front.
 */

// Alias attendu par ton front: POST /api/auth/mot-de-passe-oublie
router.post(
  "/mot-de-passe-oublie",
  valider(schemaDemandeReinitialisation),
  (req, res, next) => controller.demanderReinitialisation(req, res, next)
);

// Ta route existante (on la conserve pour compatibilité)
router.post(
  "/demande-reinitialisation",
  valider(schemaDemandeReinitialisation),
  (req, res, next) => controller.demanderReinitialisation(req, res, next)
);

/**
 * ETAPE 2 — Réinitialisation avec token
 * On garde ta route d’origine ET on ajoute l’alias /reinitialiser/:token attendu par le front.
 */

// Alias attendu par ton front: POST /api/auth/reinitialiser/:token
router.post(
  "/reinitialiser/:token",
  valider(schemaReinitialisationMDP),
  (req, res, next) => controller.reinitialiserMotDePasse(req, res, next)
);

// Ta route existante (on la conserve pour compatibilité)
router.post(
  "/reinitialiser-mot-de-passe/:token",
  valider(schemaReinitialisationMDP),
  (req, res, next) => controller.reinitialiserMotDePasse(req, res, next)
);

export default router;
