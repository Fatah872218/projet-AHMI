// backend/src/validations/roleSchemas.js
import Joi from "joi";

export const createRoleSchema = Joi.object({
  nom: Joi.string().trim().min(2).required().messages({
    "string.empty": "Le nom du rôle est requis",
    "string.min": "Le nom du rôle doit contenir au moins 2 caractères",
  }),
  // liste d'ObjectId de permissions (optionnelle)
  permissions: Joi.array().items(Joi.string().hex().length(24)).default([]),
});

export const updateRoleSchema = Joi.object({
  nom: Joi.string().trim().min(2),
  permissions: Joi.array().items(Joi.string().hex().length(24)),
})
  .min(1)
  .messages({
    "object.min": "Au moins un champ doit être fourni pour la mise à jour",
  });
