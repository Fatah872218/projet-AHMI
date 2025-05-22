import express from "express";
import Categorie from "../models/modeleCategorie.js";
import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
//import isAdmin from "../middlewares/isAdmin.js";
//import authMiddleware from "../middlewares/middlewareAuth.js";

const router = express.Router();

router.get(
  "/categories",
  fakeAuthAdmin,
  /* authMiddleware, isAdmin, */ async (req, res) => {
    try {
      const categories = await Categorie.find();
      res.status(200).json(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);
// POST une nouvelle catégorie
router.post(
  "/categories",
  fakeAuthAdmin,
  /* authMiddleware, isAdmin, */ async (req, res) => {
    const { nom } = req.body;
    if (!nom || nom.trim() === "") {
      return res.status(400).json({ error: "Le nom est requis." });
    }

    try {
      const nouvelleCategorie = new Categorie({ nom });
      const saved = await nouvelleCategorie.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("Erreur création catégorie:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);
//  Modifier une catégorie
router.put("/categories/:id", fakeAuthAdmin, async (req, res) => {
  const { nom } = req.body;
  if (!nom || nom.trim() === "") {
    return res.status(400).json({ error: "Le nom est requis." });
  }

  try {
    const updated = await Categorie.findByIdAndUpdate(
      req.params.id,
      { nom },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: "Catégorie non trouvée." });
    res.json(updated);
  } catch (err) {
    console.error("Erreur modification catégorie:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

//  Supprimer une catégorie
router.delete("/categories/:id", fakeAuthAdmin, async (req, res) => {
  try {
    const deleted = await Categorie.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Catégorie non trouvée." });
    res.json({ message: "Catégorie supprimée." });
  } catch (err) {
    console.error("Erreur suppression catégorie:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router; //
