//Utilitaires pour gérer les jetons JWT.
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const genererToken = (utilisateur) => {
  return jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

export const verifierToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export default genererToken;
