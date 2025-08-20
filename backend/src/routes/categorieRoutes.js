import express from "express";
import Categorie from "../models/modeleCategorie.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import valider from "../middlewares/middlewareValidation.js";
import {
  createCategorieSchema,
  updateCategorieSchema,
} from "../validations/categorieSchemas.js";

const router = express.Router();

// Public : liste simple
router.get("/public", async (req, res) => {
  try {
    const categories = await Categorie.find().select("nom");
    res.status(200).json(categories);
  } catch (err) {
    console.error("Erreur route publique catégorie:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Admin : liste complète
router.get("/", middlewareAuth, checkRole("admin"), async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/test", (req, res) => res.send("Catégorie route OK ✅"));

// Créer
router.post(
  "/",
  middlewareAuth,
  checkRole("admin"),
  valider(createCategorieSchema),
  async (req, res) => {
    try {
      const nouvelleCategorie = new Categorie({ nom: req.body.nom });
      const saved = await nouvelleCategorie.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("Erreur création catégorie:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);

// Mettre à jour
router.put(
  "/:id",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  valider(updateCategorieSchema),
  async (req, res) => {
    try {
      const updated = await Categorie.findByIdAndUpdate(
        req.params.id,
        { nom: req.body.nom },
        { new: true }
      );
      if (!updated)
        return res.status(404).json({ error: "Catégorie non trouvée." });
      res.json(updated);
    } catch (err) {
      console.error("Erreur modification catégorie:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);

// Supprimer
router.delete(
  "/:id",
  middlewareAuth,
  checkRole("admin"),
  validateObjectId,
  async (req, res) => {
    try {
      const deleted = await Categorie.findByIdAndDelete(req.params.id);
      if (!deleted)
        return res.status(404).json({ error: "Catégorie non trouvée." });
      res.json({ message: "Catégorie supprimée." });
    } catch (err) {
      console.error("Erreur suppression catégorie:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);

export default router;
