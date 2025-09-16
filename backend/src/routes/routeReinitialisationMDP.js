// backend/src/routes/routeReinitialisationMDP.js
import express from "express";
import ControllerReinitialisationMDP from "../controllers/controllerReinitialisationMDP.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  schemaDemandeReinitialisation,
  schemaReinitialisationMDPParams,
  schemaReinitialisationMDPBody,
} from "../validations/validationAuth.js";

const router = express.Router();
const controller = new ControllerReinitialisationMDP();

/**
 * ÉTAPE 1 — Demande de réinitialisation (envoi du mail)
 * On expose la route POST /mot-de-passe-oublie (déjà utilisée côté front)
 */
router.post(
  "/mot-de-passe-oublie",
  valider(schemaDemandeReinitialisation),
  (req, res, next) => controller.demanderReinitialisation(req, res, next)
);

/**
 * ÉTAPE 2 — Réinitialisation
 *  A) Variante PARAMS → /reinitialiser/:token  (token dans l'URL)
 *  B) Variante COMPAT → /reinitialiser-mot-de-passe/:token  (token dans l'URL)
 *  C) Variante BODY    → /reinitialisation-mot-de-passe (token dans le body)
 */

// A) Route principale avec token dans l'URL
router.post(
  "/reinitialiser/:token",
  valider(schemaReinitialisationMDPParams),
  (req, res, next) => controller.reinitialiserMotDePasse(req, res, next)
);

// B) Compat historique (on conserve)
router.post(
  "/reinitialiser-mot-de-passe/:token",
  valider(schemaReinitialisationMDPParams),
  (req, res, next) => controller.reinitialiserMotDePasse(req, res, next)
);

// C) Variante JSON : token dans le body
router.post(
  "/reinitialisation-mot-de-passe",
  valider(schemaReinitialisationMDPBody),
  (req, res, next) => controller.reinitialiserMotDePasse(req, res, next)
);

export default router;
