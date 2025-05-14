import express from "express";
import ControleurRole from "../controllers/controleurRole.js";
//import middlewareAuth from "../middlewares/middlewareAuth.js";
//import checkRole from "../middlewares/middlewareCheckRole.js";

const router = express.Router();

const controleurRole = new ControleurRole();

router.get("/", /* middlewareAuth,checkRole ,*/ controleurRole.getAllRoles);
router.get("/:nom", /* middlewareAuth,checkRole, */ controleurRole.getRole);
router.post(
  "/role",
  /* middlewareAuth, checkRole, */ controleurRole.createRole
);
router.post(
  "/",
  /* middlewareAuth, checkRole("admin"),*/ controleurRole.createRole
);
router.put("/:id", /* middlewareAuth, checkRole, */ controleurRole.updateRole);
router.delete(
  "/:id",
  /* middlewareAuth, checkRole, */ controleurRole.deleteRole
);

export default router;
