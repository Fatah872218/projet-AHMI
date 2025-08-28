import Joi from "joi";

export const createPermissionSchema = Joi.object({
  nom: Joi.string().trim().min(2).required(),
  description: Joi.string().allow("").optional(),
});

export const updatePermissionSchema = Joi.object({
  nom: Joi.string().trim().min(2),
  description: Joi.string().allow(""),
}).min(1);
