// Utilitaires pour gérer les rôles et permissions.
const verifierRole = (utilisateur, roleRequis) => {
  return utilisateur.role === roleRequis;
};

export default verifierRole;
