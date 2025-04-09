import Role from "../models/modeleRole.js";

class RoleRepository {
  async trouverParNom(nom) {
    return await Role.findOne({ nom });
  }

  async sauvegarder(role) {
    return await role.save();
  }
  async createRole(data) {
    const role = new Role(data);
    return await role.save();
  }

  async findByName(nom) {
    return await Role.findOne({ nom }).populate("permissions");
  }

  async findById(id) {
    return await Role.findById(id).populate("permissions");
  }

  async findAll() {
    return await Role.find().populate("permissions");
  }

  async updateRole(id, data) {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteRole(id) {
    return await Role.findByIdAndDelete(id);
  }
}

export default new RoleRepository();
