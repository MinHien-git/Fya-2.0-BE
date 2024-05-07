import express, { Request, Response } from "express";
import authenticationMiddlewa from "../middlewares/authentication.middleware";
import {
  get_proposal_detail,
  get_proposals,
  submit_proposal,
} from "../controllers/proposal.controller";

const router = express.Router();

router.use("/proposal", authenticationMiddlewa);
router.post("/proposal/:project_id", submit_proposal);
router.get("/proposal", get_proposals);
router.get("/proposal/agency/:proposal_id", get_proposal_detail);
module.exports = router;
