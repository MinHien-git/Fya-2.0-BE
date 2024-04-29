import express, { Request, Response } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = express.Router();
const pageController = require("../controllers/page.controller");

router.get("/page/:id", pageController.getPageDetail);

router.use(authenticationMiddleware);

router.get("/management/page/:userId", pageController.getManageDetail);
router.put("/page/about/update/:pageId", pageController.putAboutPaage);

router.post("/page/award/:pageId", pageController.postPageAward);
router.put("/page/award/:awardId/update", pageController.putPageAward);
router.delete("/page/award/:awardId/delete", pageController.deletePageAward);
router.get("/page/awards/:pageId", pageController.getPageAwards);

router.post("/page/service/:pageId", pageController.postPageService);
router.put("/page/service/:serviceId/update", pageController.putPageService);
router.delete(
  "/page/service/:awardId/delete",
  pageController.deletePageService
);
router.get("/page/services/:pageId", pageController.getPageService);

router.post("/page", pageController.postPage);

module.exports = router;
