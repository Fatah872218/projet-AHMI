// backend/src/routes/auth.routes.js
import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

// Route pour la connexion des utilisateurs
router.post("/login", login);

export default router;
