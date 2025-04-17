import express from "express";
import utilisateurController from "../controllers/controllerUtilisateur.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  schemaInscription,
  schemaConnexion,
  schemaMiseAJourUtilisateur,
} from "../validations/schemasUtilisateur.js";
import checkRole from "../middlewares/middlewareCheckRole.js";

import middlewareAuth from "../middlewares/middlewareAuth.js";

const router = express.Router();
const utilisateurController = new UtilisateurController();

router.post("/auth/register", valider(schemaInscription), (req, res) =>
  utilisateurController.inscrire(req, res)
);

router.post("/auth/login", valider(schemaConnexion), (req, res) =>
  utilisateurController.connecter(req, res)
);

router.post("/auth/register", valider(schemaInscription), (req, res) =>
  utilisateurController.inscrire(req, res)
);

router.post("/auth/login", valider(schemaConnexion), (req, res) =>
  utilisateurController.connecter(req, res)
);

// Récupérer l'utilisateur connecté (protégé par authMiddleware)
//router.get("/utilisateur", (req, res) =>
// utilisateurController.obtenirProfil(req, res)
//);
router.get("/profil", middlewareAuth, utilisateurController.obtenirProfil);
// modifier utilisateur:
//router.patch("/:id", (req, res) => utilisateurController.update(req, res));
router.put("/profil", middlewareAuth, utilisateurController.mettreAJourProfil);

// supprimer un utilisateur:
router.delete(
  "/:id",
  middlewareAuth,
  utilisateurController.supprimerUtilisateur
);

router.post(
  "/:id/roles",
  middlewareAuth,
  checkRole("admin"),
  utilisateurController.assignerRole
);

export default router;
