import express from "express";
import Categorie from "../models/modeleCategorie.js";
//import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
import validateObjectId from "../middlewares/validateObjectId.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import authMiddleware from "../middlewares/middlewareAuth.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";

const router = express.Router();

router.get("/public", async (req, res) => {
  try {
    const categories = await Categorie.find().select("nom");
    res.status(200).json(categories);
  } catch (err) {
    console.error("Erreur route publique catégorie:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get(
  "/",
  //fakeAuthAdmin,
  checkRole("admin"),
  authMiddleware,
  async (req, res) => {
    console.info("Requête reçue pour obtenir les catégories");
    console.info("Utilisateur connecté (req.utilisateur) :", req.utilisateur);
    try {
      const categories = await Categorie.find();
      res.status(200).json(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);
router.get("/test", (req, res) => {
  res.send("Catégorie route OK ✅");
});

// POST une nouvelle catégorie
router.post(
  "/",
  //fakeAuthAdmin,
  checkRole("admin"),
  authMiddleware,
  async (req, res) => {
    console.log("✅ Route POST /api/categories appelée");
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
router.put(
  "/:id",
  middlewareAuth,
  validateObjectId,
  checkRole("admin"),
  async (req, res) => {
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
  }
);

//  Supprimer une catégorie
router.delete(
  "/:id",
  middlewareAuth,
  validateObjectId,
  checkRole("admin"),
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

export default router; //
