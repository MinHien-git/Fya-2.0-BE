import express, { Request, Response } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = express.Router();
const pageController = require("../controllers/page.controller");

router.get("/page", pageController.getPages);
router.get("/page/:id", pageController.getPageDetail);

router.use(authenticationMiddleware);

router.get("/management/page/:userId", pageController.getManageDetail);
router.put("/page/about/update/:pageId", pageController.putAboutPaage);

router.post("/page", pageController.postPage);

module.exports = router;
