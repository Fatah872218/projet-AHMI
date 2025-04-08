import express from "express";
import UtilisateurController from "../controllers/controllerUtilisateur.js";

const router = express.Router();
const utilisateurController = new UtilisateurController(); // Instancier la classe

router.post("/auth/register", (req, res) =>
  utilisateurController.inscrire(req, res)
);
router.post("/auth/login", (req, res) =>
  utilisateurController.connecter(req, res)
);

// Récupérer l'utilisateur connecté (protégé par authMiddleware)
router.get("/utilisateur", (req, res) =>
  utilisateurController.getUtilisateur(req, res)
);
// modifier utilisateur:
router.patch("/:id", (req, res) => utilisateurController.update(req, res));
// supprimer un utilisateur:
router.delete("/:id", (req, res) => utilisateurController.delete(req, res));
// Déconnexion
router.post("/deconnexion", (req, res) =>
  utilisateurController.deconnecter(req, res)
);
export default router;
