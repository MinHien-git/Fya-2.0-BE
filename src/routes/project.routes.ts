import express, { Request, Response } from "express";
import authenticationMiddlewa from "../middlewares/authentication.middleware";

const router = express.Router();
const projectController = require("../controllers/project.controller");

router.use("/project", authenticationMiddlewa);
router.get("/project", projectController.getProject);
router.post("/project", projectController.postProject);

router.get("/project/user", projectController.getUserProjects);

router.get("/project/:project_id", projectController.getProjectDetail);
router.get(
  "/project/:project_id/detail",
  projectController.getProjectDetailAgency
);

router.get(
  "/project/user/:project_id/detail",
  projectController.getUserProjectDetail
);
module.exports = router;
