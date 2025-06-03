import express from "express";
import ControleurRole from "../controllers/controleurRole.js";
import fakeAuthAdmin from "../middlewares/fakeAuthAdmin.js";
//import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";

const router = express.Router();

const controleurRole = new ControleurRole();

router.get("/", fakeAuthAdmin, checkRole("admin"), controleurRole.getAllRoles);
router.get("/:nom", controleurRole.getRole);

router.post("/", fakeAuthAdmin, checkRole("admin"), controleurRole.createRole);
router.put("/:id", checkRole("admin"), controleurRole.updateRole);
router.delete(
  "/:id",
  fakeAuthAdmin,
  checkRole("admin"),
  controleurRole.deleteRole
);

export default router;
