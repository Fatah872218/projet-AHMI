import express from "express";
import axios from "axios";
import { geocodeLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.get("/", geocodeLimiter, async (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== "string" || q.length > 120) {
    return res.status(400).json({ message: "Paramètre q invalide" });
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "ahmi-app/1.0",
          "Accept-Language": "fr",
        },
        timeout: 5000,
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Erreur Nominatim :", err.message);
    res.status(500).json({ message: "Erreur de géolocalisation" });
  }
});

export default router;
