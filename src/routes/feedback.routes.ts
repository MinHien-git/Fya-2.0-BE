import express from "express";
import authenticationMiddlewa from "../middlewares/authentication.middleware";
import { postFeedback } from "../controllers/feedback.controller";

const router = express.Router();
router.use("/feedback", authenticationMiddlewa);

router.post("/feedback/user/:project_id/page/:page_id", postFeedback);
module.exports = router;
