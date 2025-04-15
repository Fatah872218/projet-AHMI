/* import express from "express";
import ControllerReinitialisationMDP from "../controllers/controllerReinitialisationMDP.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  schemaDemandeReinitialisation,
  schemaReinitialisationMDP,
} from "../validations/validationAuth.js";

const router = express.Router();

const controller = new ControllerReinitialisationMDP();

router.post(
  "/demande-reinitialisation",
  valider(schemaDemandeReinitialisation),
  (req, res, next) => controller.demanderReinitialisation(req, res, next)
);

router.post(
  "/reinitialiser-mot-de-passe/:token",
  valider(schemaReinitialisationMDP),
  (req, res, next) => controller.reinitialiserMotDePasse(req, res, next)
);

export default router;
 */
