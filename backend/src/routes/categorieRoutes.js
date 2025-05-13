import express from "express";
import Categorie from "../models/modeleCategorie.js";

const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router; //
