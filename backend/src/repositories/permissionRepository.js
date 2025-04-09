import Permission from "../models/modelePermission.js";

class PermissionRepository {
  async trouverParNom(nom) {
    return await Permission.findOne({ nom });
  }

  async sauvegarder(permission) {
    return await permission.save();
  }
}

export default new PermissionRepository();
