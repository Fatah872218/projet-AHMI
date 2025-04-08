import Role from "../models/modeleRole.js";

class RoleRepository {
  async trouverParNom(nom) {
    return await Role.findOne({ nom });
  }

  async sauvegarder(role) {
    return await role.save();
  }
}

export default new RoleRepository();
