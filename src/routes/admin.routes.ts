import express, { Request, Response } from "express";
import authenticationToken from "../middlewares/authentication.middleware";

const router = express.Router();
router.use("/admin", authenticationToken);
router.get("/admin/projects", (request: Request, response: Response) => {
  response.send("Hello world");
});

router.get("/admin/project/:id", (request: Request, response: Response) => {
  response.send("Hello world");
});

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
