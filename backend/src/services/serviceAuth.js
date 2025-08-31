import jwt from "jsonwebtoken";
import argon2 from "argon2";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import UtilisateurRepository from "../repositories/repositoryUtilisateur.js";
import { schemaInscription } from "../validations/schemasUtilisateur.js";

dotenv.config();

export default class ServiceAuth {
  constructor() {
    this.repo = new UtilisateurRepository();
  }

  /* ---------- INSCRIPTION ---------- */
  async inscrireUtilisateur({ nom, email, motDePasse }) {
    // Validation
    const { error } = schemaInscription.validate({ nom, email, motDePasse });
    if (error) throw new Error(error.details[0].message);

    // Vérifie doublon
    if (await this.repo.trouverParEmail(email))
      throw new Error("Cet utilisateur existe déjà");

    // Génère un code d’activation
    const activationCode = crypto.randomBytes(16).toString("hex");

    // Hash du mot de passe
    const hash = await argon2.hash(motDePasse);

    // Création utilisateur
    const utilisateur = await this.repo.createUtilisateur({
      nom,
      email,
      motDePasse: hash,
      role: "user",
      isActif: false,
      activationCode,
    });

    // Envoie l'e-mail d'activation
    await this.envoyerEmailActivation(utilisateur.email, activationCode);

    // Création du token
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

  /* ---------- Email activation ---------- */
  async envoyerEmailActivation(email, code) {
    const lienActivation = `${process.env.FRONTEND_URL}/activation/${code}`;
    console.log("🔗 Lien d’activation :", lienActivation); // Pour tests dev

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"AHMI" <no-reply@ahmi.local>',
      to: email,
      subject: "Activation de votre compte",
      html: `
        <p>Bonjour,</p>
        <p>Merci de vous être inscrit sur AHMI.</p>
        <p>Veuillez activer votre compte en cliquant sur ce lien :</p>
        <p><a href="${lienActivation}">${lienActivation}</a></p>
        <p>Ce lien est valable pendant une durée limitée.</p>
        <p>À bientôt !</p>
      `,
    });
  }

  /* ---------- Email réinitialisation (placeholder) ---------- */
  async envoyerEmailReinitialisation(email) {
    // À implémenter si besoin
  }
}
