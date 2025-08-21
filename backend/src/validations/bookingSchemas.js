// validations/bookingSchemas.js
import Joi from "joi";

export const createBookingSchema = Joi.object({
  // format "BD"
  evenement: Joi.string().hex().length(24).messages({
    "string.hex": "Identifiant d'évènement invalide",
    "string.length": "Identifiant d'évènement invalide",
    "string.empty": "L'identifiant de l'évènement est requis",
  }),
  nombrePlaces: Joi.number().integer().min(1).messages({
    "number.base": "Le nombre de places doit être un entier",
    "number.min": "Il faut réserver au moins une place",
  }),

  // champs optionnels
  notes: Joi.string().allow("").optional(),
  utilisateur: Joi.string().hex().length(24).optional(),
  statut: Joi.string()
    .valid("confirme", "annule")
    .default("confirme")
    .optional(),

  // alias "front"
  eventId: Joi.string().hex().length(24),
  places: Joi.number().integer().min(1),
})
  // Renommer les alias front -> BD
  .rename("eventId", "evenement", { ignoreUndefined: true, override: true })
  .rename("places", "nombrePlaces", { ignoreUndefined: true, override: true })
  // Exiger au final la présence des 2 champs requis
  .custom((value, helpers) => {
    if (!value.evenement)
      return helpers.error("any.custom", {
        message: "evenement (ou eventId) est requis",
      });
    if (typeof value.nombrePlaces === "undefined")
      return helpers.error("any.custom", {
        message: "nombrePlaces (ou places) est requis",
      });
    return value;
  }, "Présence des champs requis");

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
