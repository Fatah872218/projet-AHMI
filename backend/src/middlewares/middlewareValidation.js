// middlewares/middlewareValidation.js
// Middleware générique pour valider body / params / query avec Joi
export const validate =
  (schemas = {}) =>
  (req, res, next) => {
    try {
      const parts = ["body", "params", "query"];
      for (const part of parts) {
        const schema = schemas[part];
        if (!schema) continue;

        const { error, value } = schema.validate(req[part], {
          abortEarly: false, // renvoyer toutes les erreurs
          stripUnknown: true, // supprimer les champs inattendus
          convert: true, // "2" -> 2 si nombre attendu
        });

        if (error) {
          return res.status(400).json({
            message: "Données invalides",
            details: error.details.map((d) => ({
              path: d.path.join("."),
              message: d.message,
            })),
          });
        }
        req[part] = value; // données nettoyées
      }
      next();
    } catch (e) {
      next(e);
    }
  };

// Raccourcis
export const vBody = (schema) => validate({ body: schema });
export const vParams = (schema) => validate({ params: schema });
export const vQuery = (schema) => validate({ query: schema });

// Compat avec ton code existant: export par défaut = validation du body
const valider = (schema) => vBody(schema);
export default valider;
