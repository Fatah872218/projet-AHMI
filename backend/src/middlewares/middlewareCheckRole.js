// src/middlewares/middlewareCheckRole.js
const checkRole = (...rolesAutorises) => {
  return async (req, res, next) => {
    try {
      if (!req.utilisateur) {
        return res.status(401).json({ message: "Authentification requise" });
      }

      // Ici on s’appuie sur req.utilisateur.roles (tableau d’IDs ou de noms selon ton modèle)
      // Si tu stockes des ObjectId -> mappe-les en noms en amont ou fais un populate ici.
      const aUnRoleAutorise = (req.utilisateur.roles || []).some(
        (r) => rolesAutorises.includes(r.nom || r) // accepte _id converti ou nom
      );

      if (!aUnRoleAutorise) {
        return res.status(403).json({
          message: `Accès refusé. Rôle requis : ${rolesAutorises.join(" ou ")}`,
        });
      }

      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur vérification rôle : " + err.message });
    }
  };
};

export default checkRole;
