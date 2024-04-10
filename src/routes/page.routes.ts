import express, { Request, Response } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = express.Router();
const pageController = require("../controllers/page.controller");

router.use(authenticationMiddleware);
router.get("/page", pageController.getPages);

router.get("/page/:userId", pageController.getManageDetail);

router.post("/page", pageController.postPage);

router.get("/project/:id", pageController.getPageDetail);

module.exports = router;
