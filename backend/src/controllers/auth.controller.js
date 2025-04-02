// backend/src/controllers/auth.controller.js
import User from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: `Email et mot de passe requis` });
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: `identifiants invalides` });

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid)
      return res.status(401).json({ message: `Mot de passe inscorrect` });

    const payload = { id: user._id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || "1d",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
    });
    // 5. Répondre au client
    res.json({
      message: "Connexion réussie",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
