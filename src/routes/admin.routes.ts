import express, { Request, Response } from "express";
import { getNewProject } from "../controllers/admin.controller";
import authenticationToken from "../middlewares/authentication.middleware";

const router = express.Router();
router.use("/admin", authenticationToken);
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
