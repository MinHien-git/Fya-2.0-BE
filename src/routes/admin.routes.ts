import express, { Request, Response } from "express";
import { getAgencyPage, getBriefingsAccepted, getBriefingsSent, getCompletedProjects, getData, getNewProject, getProjectsData, getProposalsAccepted, getProposalsSent, getUsers } from "../controllers/admin.controller";
import authenticationToken from "../middlewares/authentication.middleware";

const router = express.Router();
router.use("/admin", authenticationToken);
router.use("/admin/users", getUsers);
router.use("/admin/agencyPage", getAgencyPage);
router.use("/admin/data", getData);
router.use("/admin/projectsData", getProjectsData);
router.use("/admin/briefingsSent", getBriefingsSent);
router.use("/admin/briefingsAccepted", getBriefingsAccepted);
router.use("/admin/proposalsSent", getProposalsSent);
router.use("/admin/proposalsAccepted", getProposalsAccepted);
router.get("/admin/completedProjects", getCompletedProjects);

router.get("/admin/projects/new", getNewProject);

router.get("/admin/project/:id", getNewProject);

router.post(
  "/admin/project/:id/proposal",
  (request: Request, response: Response) => {
    response.send("Hello world");
  }
);

router.get(
  "/admin/project/:id/proposal/:proposalId",
  (request: Request, response: Response) => {
    response.send("Hello world");
  }
);

router.get(
  "/admin/project/:id/proposal/:proposalId/feedback",
  (request: Request, response: Response) => {
    response.send("Hello world");
  }
);
module.exports = router;
