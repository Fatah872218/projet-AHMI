import Utilisateur from "../models/modeleUtilisateur.js";

export default class UtilisateurRepository {
  /* ---- lecture ---- */
  async trouverParEmail(email, withPassword = false) {
    const projection = withPassword ? "+motDePasse" : "-motDePasse";
    return Utilisateur.findOne({ email }).select(projection);
  }

  async trouverParTokenReinitialisation(token) {
    return Utilisateur.findOne({ tokenReinitialisation: token });
  }

  /* ---- écriture ---- */
  async definirTokenReinitialisation(email, token, expiration) {
    return Utilisateur.updateOne(
      { email },
      {
        tokenReinitialisation: token,
        expirationTokenReinitialisation: expiration,
      }
    );
  }

  async reinitialiserMotDePasse(id, nouveauHash) {
    return Utilisateur.findByIdAndUpdate(
      id,
      {
        motDePasse: nouveauHash,
        tokenReinitialisation: undefined,
        expirationTokenReinitialisation: undefined,
      },
      { new: true }
    );
  }

  /* ---- autres méthodes que tu conservais ---- */
  async createUtilisateur(data) {
    return Utilisateur.create(data);
  }
  async findById(id) {
    return Utilisateur.findById(id);
  }
  async updateU(id, data) {
    return Utilisateur.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteU(id) {
    return Utilisateur.findByIdAndDelete(id);
  }
}
