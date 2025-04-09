import RoleRepository from "../repositories/roleRepository.js";

class ServiceRole {
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async createRole(data) {
    try {
      return await this.roleRepository.createRole(data);
    } catch (err) {
      throw new Error(`Erreur lors de la création du rôle : ${err.message}`);
    }
  }

  async getRoleByName(nom) {
    try {
      return await this.roleRepository.findByName(nom);
    } catch (err) {
      throw new Error(
        `Erreur lors de la récupération du rôle : ${err.message}`
      );
    }
  }

  async getRoleById(id) {
    try {
      return await this.roleRepository.findById(id);
    } catch (err) {
      throw new Error(
        `Erreur lors de la récupération du rôle : ${err.message}`
      );
    }
  }
  async getAllRoles() {
    return await this.roleRepository.findAll();
  }

  async updateRole(id, updateData) {
    try {
      return await this.roleRepository.updateRole(id, updateData);
    } catch (err) {
      throw new Error(`Erreur lors de la mise à jour du rôle : ${err.message}`);
    }
  }

  async deleteRole(id) {
    try {
      return await this.roleRepository.deleteRole(id);
    } catch (err) {
      throw new Error(`Erreur lors de la suppression du rôle : ${err.message}`);
    }
  }
}

export default ServiceRole;
