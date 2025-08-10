import express from "express";
import ControleurRole from "../controllers/controleurRole.js";
//import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";
import validateObjectId from "../middlewares/validateObjectId.js";
const router = express.Router();

const controleurRole = new ControleurRole();

router.get("/", middlewareAuth, checkRole("admin"), controleurRole.getAllRoles);
router.get("/:nom", controleurRole.getRole);

router.post("/", middlewareAuth, checkRole("admin"), controleurRole.createRole);
router.put(
  "/:id",
  validateObjectId,
  checkRole("admin"),
  controleurRole.updateRole
);
router.delete(
  "/:id",
  middlewareAuth,
  validateObjectId,
  checkRole("admin"),
  controleurRole.deleteRole
);

export default router;
