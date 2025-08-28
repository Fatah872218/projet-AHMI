import express from "express";
import utilisateurController from "../controllers/controllerUtilisateur.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import valider from "../middlewares/middlewareValidation.js";

//
import {
  schemaInscription,
  schemaConnexion,
  schemaMiseAJourUtilisateur,
} from "../validations/schemasUtilisateur.js";

const router = express.Router();

/**
 * Auth "utilisateur"
 * NB : si tu as DÉJÀ des routes /api/auth/* dans routesAuth.js,
 *      garde UNE seule des deux familles pour éviter les doublons.
 */
router.post("/auth/register", valider(schemaInscription), (req, res) =>
  utilisateurController.inscrire(req, res)
);

router.post("/auth/login", valider(schemaConnexion), (req, res) =>
  utilisateurController.connecter(req, res)
);

/**
 * Profil (nécessite authentification)
 */
router.get("/profil", middlewareAuth, (req, res) =>
  utilisateurController.obtenirProfil(req, res)
);

router.put(
  "/profil",
  middlewareAuth,
  valider(schemaMiseAJourUtilisateur),
  (req, res) => utilisateurController.mettreAJourProfil(req, res)
);

/**
 * Admin : suppression + assignation de rôle
 */
router.delete(
  "/:id",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  (req, res) => utilisateurController.supprimerUtilisateur(req, res)
);

router.post(
  "/:id/roles",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  (req, res) => utilisateurController.assignerRole(req, res)
);

export default router;
