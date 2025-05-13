import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/geocode", async (req, res) => {
  const { q } = req.query;
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
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Erreur Nominatim :", err.message);
    res.status(500).json({ message: "Erreur de géolocalisation" });
  }
});

export default router;
