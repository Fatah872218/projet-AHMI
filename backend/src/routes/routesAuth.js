import express from "express";
import controleurAuth from "../controllers/controleurAuth.js";
import ControllerReinitialisationMDP from "../controllers/controllerReinitialisationMDP.js";
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
const reinitCtrl = new ControllerReinitialisationMDP();

/* ───── Inscription / Connexion ───── */
router.post(
  "/inscription",
  valider(schemaInscription),
  controleurAuth.inscription
);
router.post("/connexion", valider(schemaConnexion), controleurAuth.connexion);

/* ───── Mot de passe oublié / Réinitialisation ─────
   On ALIASE ici vers le même contrôleur que routeReinitialisationMDP,
   pour garantir le même comportement (succès silencieux si email inconnu). */
router.post(
  "/mot-de-passe-oublie",
  valider(schemaDemandeReinitialisation),
  (req, res, next) => reinitCtrl.demanderReinitialisation(req, res, next)
);

router.post(
  "/reinitialiser/:token",
  valider(schemaReinitialisationMDP),
  (req, res, next) => reinitCtrl.reinitialiserMotDePasse(req, res, next)
);

/* ───── Activation & Déconnexion ───── */
router.get("/activation/:code", controleurAuth.activerCompte);
router.post("/deconnexion", controleurAuth.deconnecter);

export default router;
