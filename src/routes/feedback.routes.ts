import express from "express";
import authenticationMiddlewa from "../middlewares/authentication.middleware";
import {
  postFeedback,
  postUserFeedback,
} from "../controllers/feedback.controller";

const router = express.Router();
router.use("/feedback", authenticationMiddlewa);

router.post("/feedback/user/:project_id/page/:page_id", postFeedback);

router.post("/feedback/user/:project_id/agency", postUserFeedback);

module.exports = router;
