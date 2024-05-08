import express, { Request, Response } from "express";
import authenticationMiddlewa from "../middlewares/authentication.middleware";
import {
  accept_proposal,
  cancel_proposal,
  complete_proposal,
  get_completed_proposal,
  get_proposal_detail,
  get_proposal_feedback_detail,
  get_proposals,
  ongoing_proposal,
  reject_proposal,
  submit_proposal,
} from "../controllers/proposal.controller";

const router = express.Router();

router.use("/proposal", authenticationMiddlewa);
router.post("/proposal/:project_id", submit_proposal);
router.get("/proposal", get_proposals);
router.get("/proposal/agency/:proposal_id", get_proposal_detail);
router.get(
  "/proposal/:proposal_id/feedback/:project_id",
  get_proposal_feedback_detail
);

router.patch(
  "/proposal/agency/:proposal_id/accept/:project_id",
  accept_proposal
);
router.put("/proposal/agency/:proposal_id/reject", reject_proposal);
router.put("/proposal/agency/:proposal_id/complete", complete_proposal);
router.put("/proposal/agency/:proposal_id/cancel", cancel_proposal);

router.get("/proposal/user/onGoing", ongoing_proposal);
router.get("/proposal/user/completed", get_completed_proposal);
module.exports = router;
