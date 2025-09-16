import Joi from "joi";

export const schemaDemandeReinitialisation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email invalide",
    "string.empty": "L'email est requis",
  }),
});

export const schemaReinitialisationMDPParams = Joi.object({
  motDePasse: Joi.string().min(8).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères",
    "string.empty": "Le mot de passe est requis",
  }),
  confirmationMotDePasse: Joi.string()
    .valid(Joi.ref("motDePasse"))
    .required()
    .messages({
      "any.only": "Les mots de passe ne correspondent pas",
      "string.empty": "La confirmation du mot de passe est requise",
    }),
});
export const schemaReinitialisationMDPBody = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Le token est requis",
  }),
  motDePasse: Joi.string().min(8).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères",
    "string.empty": "Le mot de passe est requis",
  }),
  confirmationMotDePasse: Joi.string()
    .valid(Joi.ref("motDePasse"))
    .required()
    .messages({
      "any.only": "Les mots de passe ne correspondent pas",
      "string.empty": "La confirmation du mot de passe est requise",
    }),
});
export { schemaReinitialisationMDPBody as schemaReinitialisationMDP };
