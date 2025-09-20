import express from "express";
import controleurAuth from "../controllers/controleurAuth.js";

import Joi from "joi";
import valider from "../middlewares/middlewareValidation.js";
import {
  schemaInscription,
  schemaConnexion,
} from "../validations/schemasUtilisateur.js";

const router = express.Router();

/* ───── Inscription / Connexion ───── */
router.post(
  "/inscription",
  valider(schemaInscription),
  controleurAuth.inscription
);
router.post("/connexion", valider(schemaConnexion), controleurAuth.connexion);

/* ───── Renvoyer e-mail d’activation ───── */
const schemaResendActivation = Joi.object({
  email: Joi.string().email().required(),
});

router.post(
  "/activation/resend",
  valider(schemaResendActivation),
  (req, res, next) => {
    controleurAuth.renvoyerActivation(req, res, next);
  }
);
/* ───── Activation & Déconnexion ───── */
router.get("/activation/:code", controleurAuth.activerCompte);
router.post("/deconnexion", controleurAuth.deconnecter);

export default router;
