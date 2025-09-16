import ServiceReinitialisationMDP from "../services/serviceReinitialisationMDP.js";

class ControllerReinitialisationMDP {
  constructor() {
    this.serviceReinitialisation = new ServiceReinitialisationMDP();
  }

  async demanderReinitialisation(req, res, next) {
    try {
      const { email } = req.body ?? {};
      if (!email) return res.status(400).json({ message: "Email requis" });

      const out = await this.serviceReinitialisation.demanderReinitialisation(
        email
      );
      res.status(200).json(out);
    } catch (err) {
      next(err);
    }
  }

  async reinitialiserMotDePasse(req, res, next) {
    try {
      const token = req.params?.token || req.body?.token;
      const { motDePasse } = req.body ?? {};
      if (!token || !motDePasse) {
        return res
          .status(400)
          .json({ message: "Token et mot de passe requis" });
      }

      const out = await this.serviceReinitialisation.reinitialiserMotDePasse(
        token,
        motDePasse
      );
      res.status(200).json(out);
    } catch (err) {
      next(err);
    }
  }
}

export default ControllerReinitialisationMDP;
