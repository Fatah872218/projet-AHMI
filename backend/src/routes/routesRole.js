import express from "express";
import ControleurRole from "../controllers/controleurRole.js";
import middlewareAuth from "../middlewares/middlewareAuth.js";
import checkRole from "../middlewares/middlewareCheckRole.js";

const router = express.Router();

router.get("/", middlewareAuth, ControleurRole.getAllRoles);
router.get("/:nom", middlewareAuth, ControleurRole.getRole);
router.post("/", middlewareAuth, ControleurRole.createRole);
router.post("/", middlewareAuth, checkRole("admin"), ControleurRole.createRole);
router.put("/:id", middlewareAuth, ControleurRole.updateRole);
router.delete("/:id", middlewareAuth, ControleurRole.deleteRole);

export default router;
