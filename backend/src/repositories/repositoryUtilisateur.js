import Utilisateur from "../models/modeleUtilisateur.js";

class UtilisateurRepository {
  async createUtilisateur(utilisateurData) {
    try {
      const utilisateur = new Utilisateur(utilisateurData);
      return await utilisateur.save();
    } catch (err) {
      throw new Error(
        `Erreur lors de la création de l'utilisateur : ${err.message}`
      );
    }
  }

  // Trouver un utilisateur par email
  // Trouver un utilisateur par email (avec ou sans mot de passe)
  async findByEmail(email, includePassword = false) {
    try {
      const query = Utilisateur.findOne({ email });
      if (includePassword) {
        query.select("+motDePasse"); // Inclure le mot de passe
      }
      return await query;
    } catch (err) {
      throw new Error(
        `Erreur lors de la recherche de l'utilisateur par email : ${err.message}`
      );
    }
  }

  // Trouver un utilisateur par un id
  async findById(id) {
    try {
      return await Utilisateur.findById(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la recherche de l'utilisateur par id : ${err.message}`
      );
    }
  }
  // Mettre à jour un utilisateur
  async updateU(id, updateData) {
    try {
      return await Utilisateur.findByIdAndUpdate(id, updateData, { new: true });
    } catch (err) {
      throw new Error(`mise à jour de l'utilisateur echouée : ${err.message}`);
    }
  }

  // Supprimer un utilisateur
  async deleteU(id) {
    try {
      return await Utilisateur.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la suppression de l'utilisateur : ${err.message}`
      );
    }
  }

  //-------definir le token a rénitialiser
  /* setResetToken ,*/
  async definirTokenReinitialisation(email, token, expiration) {
    return await Utilisateur.findOneAndUpdate(
      { email },
      {
        tokenReinitialisation: token,
        expirationTokenReinitialisation: expiration,
      },
      { new: true }
    );
  }
  //------------ findByResetToken(token),resetPasswordToken,resetPasswordExpires:
  async trouverParTokenReinitialisation(token) {
    return await Utilisateur.findOne({
      tokenReinitialisation: token,
      expirationTokenReinitialisation: { $gt: Date.now() },
    });
  }
  //---------updatePassword,
  async reinitialiserMotDePasse(id, nouveauMotDePasse) {
    return await Utilisateur.findByIdAndUpdate(
      id,
      {
        motDePasse: nouveauMotDePasse,
        tokenReinitialisation: undefined,
        expirationTokenReinitialisation: undefined,
      },
      { new: true }
    );
  }
}
export default UtilisateurRepository;
