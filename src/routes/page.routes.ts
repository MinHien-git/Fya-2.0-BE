import express, { Request, Response } from "express";
import authenticationMiddlewa from "../middlewares/authentication.middleware";

const router = express.Router();
const pageController = require("../controllers/page.controller");

router.use(authenticationMiddlewa);
router.get("/page", pageController.getPages);
router.post("/page", pageController.postPage);

router.get("/project/:id", pageController.getPageDetail);

module.exports = router;
