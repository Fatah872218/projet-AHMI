export default function fakeAuthAdmin(req, res, next) {
  req.utilisateur = { id: "64cd1f4c3b278baf7f0a6c93", role: "admin" };
  console.log("UTILISATEUR SIMULÉ :", req.utilisateur);

  next();
}
