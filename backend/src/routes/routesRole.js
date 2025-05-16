import express from "express";
import ControleurRole from "../controllers/controleurRole.js";
import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
//import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";

const router = express.Router();

const controleurRole = new ControleurRole();

router.get(
  "/",
  fakeAuthAdmin,
  checkRole,
  /* middlewareAuth,*/ controleurRole.getAllRoles
);
router.get("/:nom", /* middlewareAuth,checkRole, */ controleurRole.getRole);
router.post(
  "/role",
  fakeAuthAdmin,
  checkRole,
  /* middlewareAuth,  */ controleurRole.createRole
);
router.post(
  "/",
  fakeAuthAdmin,
  checkRole("admin"),
  /* middlewareAuth,*/ controleurRole.createRole
);
router.put("/:id", /* middlewareAuth,  */ checkRole, controleurRole.updateRole);
router.delete(
  "/:id",
  fakeAuthAdmin,
  /* middlewareAuth, */ checkRole,
  controleurRole.deleteRole
);

export default router;
