// src/middlewares/middlewareCheckRole.js
const normalize = (v) =>
  typeof v === "string"
    ? v.toLowerCase()
    : typeof v === "object" && v !== null
    ? (v.nom || v.name || v.role || v._id || "").toString().toLowerCase()
    : (v || "").toString().toLowerCase();

const checkRole = (...rolesAutorises) => {
  const attendus = rolesAutorises.map((r) => r.toLowerCase());

  return async (req, res, next) => {
    try {
      if (!req.utilisateur) {
        return res.status(401).json({ message: "Authentification requise" });
      }

      // Rôles disponibles sur la requête
      const { role, roles } = req.utilisateur;

      // Construit une liste plate de noms de rôles (strings)
      const collect = [];
      if (role) collect.push(role);
      if (Array.isArray(roles)) collect.push(...roles);

      const possedes = collect.map(normalize).filter(Boolean);

      // Recherche d'intersection case-insensitive
      const ok = possedes.some((r) => attendus.includes(r));

      if (!ok) {
        return res.status(403).json({
          message:
            attendus.length === 1
              ? `Accès refusé. Rôle requis : ${rolesAutorises[0]}`
              : `Accès refusé. Rôles requis : ${rolesAutorises.join(" ou ")}`,
        });
      }

      return next();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erreur vérification rôle : " + err.message });
    }
  };
};

export default checkRole;
