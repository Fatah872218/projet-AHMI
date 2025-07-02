import Utilisateur from "../models/modeleUtilisateur.js";

const checkRole = (...rolesAutorises) => {
  return async (req, res, next) => {
    try {
      console.log("DDDDDDDD", req.utilisateur);

      // SIMULATION TEMPORAIRE
      if (req.utilisateur?.role === "admin") {
        return next();
      }

      const utilisateur = await Utilisateur.findById(
        req.utilisateur.id
      ).populate("roles");

      if (!utilisateur || !utilisateur.roles?.length) {
        return res.status(403).json({ message: "Aucun rôle assigné" });
      }

      const nomsRoles = utilisateur.roles.map((r) => r.nom);

      if (nomsRoles.includes("admin")) {
        return next();
      }

      const aUnRoleAutorise = nomsRoles.some((role) =>
        rolesAutorises.includes(role)
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
