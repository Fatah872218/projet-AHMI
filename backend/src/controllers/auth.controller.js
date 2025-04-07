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
    const user = await User.findOne({ email }).populate("roles");
    if (!user) {
      return res.status(401).json({ message: "Email incorrect" });
    }
    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    const userRole = user.roles.length > 0 ? user.roles[0].nom : "visiteur";
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: userRole },
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
      }
    );
    // 5. Répondre au client
    res.json({
      message: "Connexion réussie",
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
