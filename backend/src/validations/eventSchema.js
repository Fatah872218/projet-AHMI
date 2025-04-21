// validations/eventSchemas.js
import Joi from "joi";

export const createEventSchema = Joi.object({
  titre: Joi.string().required().messages({
    "string.empty": "Le titre est requis",
  }),
  description: Joi.string().allow(""),
  dateDebut: Joi.date().required().messages({
    "date.base": "La date de début est requise",
  }),
  dateFin: Joi.date().greater(Joi.ref("dateDebut")).required().messages({
    "date.greater": "La date de fin doit être après la date de début",
    "date.base": "La date de fin est requise",
  }),
  lieu: Joi.object({
    nom: Joi.string().required(),
    adresse: Joi.string().required(),
    coordonnees: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    }),
  }).required(),
  capaciteMax: Joi.number().integer().positive().required(),
  prix: Joi.number().min(0).default(0),
  imageUrl: Joi.string().uri().optional(),
  participationFinanciere: Joi.string().optional(),
  lienInstagram: Joi.string().uri().optional(),
  categories: Joi.array().items(Joi.string().length(24)),
});

export const updateEventSchema = Joi.object({
  titre: Joi.string(),
  description: Joi.string().allow(""),
  dateDebut: Joi.date(),
  dateFin: Joi.date().greater(Joi.ref("dateDebut")).optional(),
  lieu: Joi.object({
    nom: Joi.string(),
    adresse: Joi.string(),
    coordonnees: Joi.object({
      lat: Joi.number(),
      lng: Joi.number(),
    }),
  }),
  capaciteMax: Joi.number().integer().positive(),
  prix: Joi.number().min(0),
  imageUrl: Joi.string().uri(),
  participationFinanciere: Joi.string(),
  lienInstagram: Joi.string().uri(),
  categories: Joi.array().items(Joi.string().length(24)),
})
  .min(1)
  .messages({
    "object.min": "Au moins un champ doit être fourni pour la mise à jour",
  });
