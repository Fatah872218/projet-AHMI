// validations/schemasUtilisateur.js
import Joi from "joi";

export const schemaInscription = Joi.object({
  nom: Joi.string().required().messages({
    "string.empty": "Le nom est requis",
  }),
  prenom: Joi.string().allow(""),
  email: Joi.string().email().required().messages({
    "string.email": "Email invalide",
    "string.empty": "L'email est requis",
  }),
  motDePasse: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    )

    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir au moins 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial.",
      "string.empty": "Le mot de passe est requis",
    }),

  telephone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow("")
    .messages({
      "string.pattern.base": "Le téléphone doit contenir 10 chiffres",
    }),
  consentementCGU: Joi.boolean().valid(true).messages({
    "any.only": "Vous devez accepter les CGU",
  }),
  activationCode: Joi.string(),
});

export const schemaConnexion = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email invalide",
    "string.empty": "L'email est requis",
  }),
  motDePasse: Joi.string().required().messages({
    "string.empty": "Le mot de passe est requis",
  }),
});

export const schemaMiseAJourUtilisateur = Joi.object({
  nom: Joi.string(),
  prenom: Joi.string().allow(""),
  telephone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow("")
    .messages({
      "string.pattern.base": "Le téléphone doit contenir 10 chiffres",
    }),
  adresse: Joi.object({
    rue: Joi.string().allow(""),
    codePostal: Joi.string()
      .pattern(/^[0-9]{5}$/)
      .allow("")
      .messages({
        "string.pattern.base": "Code postal invalide",
      }),
    ville: Joi.string().allow(""),
  }),
  notifications: Joi.object({
    newsletter: Joi.boolean(),
    rappelEvenement: Joi.boolean(),
  }),
})
  .min(1)
  .messages({
    "object.min": "Au moins un champ doit être fourni pour la mise à jour",
  });
