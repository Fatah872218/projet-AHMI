// validations/categorieSchemas.js
import Joi from "joi";

export const createCategorieSchema = Joi.object({
  nom: Joi.string().trim().min(2).required().messages({
    "string.empty": "Le nom est requis",
    "string.min": "Le nom doit contenir au moins 2 caractères",
  }),
});

export const updateCategorieSchema = Joi.object({
  nom: Joi.string().trim().min(2).required().messages({
    "string.empty": "Le nom est requis",
    "string.min": "Le nom doit contenir au moins 2 caractères",
  }),
});
