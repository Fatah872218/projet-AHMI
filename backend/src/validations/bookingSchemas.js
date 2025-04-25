//src/validations/bookingSchemas.js
import Joi from "joi";

export const createBookingSchema = Joi.object({
  evenement: Joi.string().length(24).required().messages({
    "string.empty": "L'identifiant de l'évènement est requis",
  }),
  nombrePlaces: Joi.number().integer().min(1).required().messages({
    "number.base": "Le nombre de places doit être un entier",
    "number.min": "Il faut réserver au moins une place",
  }),
  notes: Joi.string().allow("").optional(),
  utilisateur: Joi.string().length(24).optional().messages({
    "string.empty": "L'identifiant de l'utilisateur est requis",
  }),
  statut: Joi.string()
    .valid("confirme", "annule")
    .default("confirme")
    .optional(),
});
export const updateBookingSchema = Joi.object({
  nombrePlaces: Joi.number().integer().min(1).messages({
    "number.min": "Il faut réserver au moins une place",
  }),
  notes: Joi.string().allow("").optional(),
})
  .min(1)
  .messages({
    "object.min": "Au moins un champ doit être fourni pour la mise à jour",
  });
