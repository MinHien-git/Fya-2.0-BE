import express, { Request, Response } from "express";
import authenticationMiddlewa from "../middlewares/authentication.middleware";

const router = express.Router();
const projectController = require("../controllers/project.controller");

router.use(authenticationMiddlewa);
router.get("/project", projectController.getProject);
router.post("/project", projectController.postProject);

router.get("/project/:id", projectController.getProjectDetail);
module.exports = router;
