// fakeAuthAdmin.js
// ➕ Middleware temporaire pour simuler un admin connecté (dev uniquement)
export default function fakeAuthAdmin(req, res, next) {
  console.log("hello");
  req.utilisateur = {
    id: "64cd1f4c3b278baf7f0a6c93", // ID fixe pour le dev
    role: "admin",
  };

  console.log(" UTILISATEUR SIMULÉ :", req.utilisateur);
  next();
}
