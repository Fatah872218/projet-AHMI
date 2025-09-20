import express from "express";
import utilisateurController from "../controllers/controllerUtilisateur.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import valider from "../middlewares/middlewareValidation.js";

//
import { schemaMiseAJourUtilisateur } from "../validations/schemasUtilisateur.js";
const router = express.Router();

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
/**
 * Admin : changer le rôle principal (user|partenaire|admin)
 */
router.patch(
  "/:id/role",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  (req, res) => utilisateurController.changerRole(req, res)
);
export default router;
