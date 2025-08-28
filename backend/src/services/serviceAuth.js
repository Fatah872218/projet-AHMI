import jwt from "jsonwebtoken";
import argon2 from "argon2";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import dotenv from "dotenv";
import { schemaInscription } from "../validations/schemasUtilisateur.js";

//import cookieParser from "cookie-parser";

// Charger les variables d'environnement
dotenv.config();

export default class ServiceAuth {
  constructor() {
    this.repo = new UtilisateurRepository();
  }
  /* ---------- INSCRIPTION ---------- */
  async inscrireUtilisateur({ nom, email, motDePasse }) {
    /* validation Joi */
    const { error } = schemaInscription.validate({ nom, email, motDePasse });
    if (error) throw new Error(error.details[0].message);

    /* doublon ? */
    if (await this.repo.trouverParEmail(email))
      throw new Error("Cet utilisateur existe déjà");

    /* hash + création */
    const hash = await argon2.hash(motDePasse);
    const utilisateur = await this.repo.createUtilisateur({
      nom,
      email,
      motDePasse: hash,
      role: "user",
      isActif: false,
    });

    /* JWT */
    const token = jwt.sign(
      { id: utilisateur._id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { utilisateur, token };
  }
  /* ---------- CONNEXION ---------- */
  async connecterUtilisateur(email, motDePasse) {
    const utilisateur = await this.repo.trouverParEmail(email, true);
    if (!utilisateur) throw new Error("Email inconnu");

    const ok = await argon2.verify(utilisateur.motDePasse, motDePasse);
    if (!ok) throw new Error("Mot de passe incorrect");
    if (!utilisateur.isActif)
      throw new Error("Veuillez activer votre compte depuis l’e-mail reçu");

    const token = jwt.sign(
      { id: utilisateur._id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { utilisateur, token };
  }
  async envoyerEmailReinitialisation(email) {
    // Logique pour envoyer un email de réinitialisation
    // Utiliser un service de messagerie comme nodemailer
  }
}
