// backend/src/validations/eventSchemas.js

import Joi from "joi";

export const eventSchema = Joi.object({
  titre: Joi.string().min(3).required().messages({
    "string.empty": "Le titre est requis",
    "string.min": "Le titre doit contenir au moins 3 caractères",
  }),

  description: Joi.string().max(500).allow("").messages({
    "string.max": "La description ne peut pas dépasser 500 caractères",
  }),

  dateDebut: Joi.date().required().messages({
    "date.base": "La date de début est invalide",
    "any.required": "La date de début est requise",
  }),

  dateFin: Joi.date().greater(Joi.ref("dateDebut")).required().messages({
    "date.base": "La date de fin est invalide",
    "date.greater": "La date de fin doit être postérieure à la date de début",
    "any.required": "La date de fin est requise",
  }),

  lieu: Joi.object({
    nom: Joi.string().allow("").optional(), // plus requis
    adresse: Joi.string().required().messages({
      "string.empty": "L'adresse du lieu est requise",
    }),
    coordonnees: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    }).required(),
  }).required(),

  capaciteMax: Joi.number().integer().positive().required().messages({
    "number.base": "La capacité doit être un nombre",
    "number.positive": "La capacité doit être supérieure à zéro",
    "any.required": "La capacité est requise",
  }),

  prix: Joi.number().min(0).default(0).messages({
    "number.base": "Le prix doit être un nombre",
    "number.min": "Le prix ne peut pas être négatif",
  }),

  imageUrl: Joi.string().uri().optional().allow("").messages({
    "string.uri": "L'URL de l'image est invalide",
  }),

  lienSiteInternet: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Le lien du site doit être une URL valide",
  }),

  lienInstagram: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Le lien Instagram doit être une URL valide",
  }),

  participationFinanciere: Joi.string().allow("").optional(),

  categories: Joi.array().items(Joi.string().length(24)).optional().messages({
    "string.length": "L'identifiant de catégorie est invalide",
  }),

  organisateur: Joi.object({
    nom: Joi.string().required(),
    email: Joi.string().email().required(),
  }).required(),
});

export const updateEventSchema = Joi.object({
  // les champs que tu autorises pour la mise à jour :
  titre: Joi.string().min(3),
  description: Joi.string().max(500).allow(""),
  dateDebut: Joi.date().iso(),
  dateFin: Joi.date().iso(),
  lieu: Joi.object({
    nom: Joi.string().allow(""),
    adresse: Joi.string(),
    coordonnees: Joi.object({
      lat: Joi.number(),
      lng: Joi.number(),
    }),
  }),
  capaciteMax: Joi.number().min(1),
  prix: Joi.number().min(0),
  imageUrl: Joi.string().uri().allow(""),
  lienSiteInternet: Joi.string().uri().allow(""),
  lienInstagram: Joi.string().uri().allow(""),
  participationFinanciere: Joi.string().allow(""),
  categories: Joi.array().items(Joi.string()),
  organisateur: Joi.object({
    nom: Joi.string(),
    email: Joi.string().email(),
  }),
});
console.log("Schémas Joi chargés correctement");
