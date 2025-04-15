const valider = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false, // Retourne toutes les erreurs
    allowUnknown: true, // Permet des champs non définis dans le schéma
    stripUnknown: true, // Supprime les champs non définis
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      succes: false,
      message: "Validation échouée",
      erreurs: messages,
    });
  }

  // Remplace le body par les données validées
  req.body = value;
  next();
};

export default valider;
