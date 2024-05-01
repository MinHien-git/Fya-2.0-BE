import express, { Request, Response } from "express";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const router = express.Router();
const pageController = require("../controllers/page.controller");
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
  limits: { fileSize: "1000000" },
});

exports.module = upload;

router.get("/page/:id", pageController.getPageDetail);

router.use(authenticationMiddleware);

router.get("/management/page/:userId", pageController.getManageDetail);
router.put("/page/about/update/:pageId", pageController.putAboutPaage);

router.post("/page/award/:pageId", pageController.postPageAward);
router.put("/page/award/:awardId/update", pageController.putPageAward);
router.delete("/page/award/:awardId/delete", pageController.deletePageAward);
router.get("/page/awards/:pageId", pageController.getPageAwards);

router.post("/page/address/:pageId", pageController.postPageAdditionAddress);
router.put(
  "/page/address/:contactId/update",
  pageController.putPageAdditionAddress
);
router.delete(
  "/page/address/:contactId/delete",
  pageController.deletePageAdditionAddress
);
router.get("/page/addresses/:pageId", pageController.getPageAdditionAddresses);

router.post("/page/service/:pageId", pageController.postPageService);
router.put("/page/service/:serviceId/update", pageController.putPageService);
router.delete(
  "/page/service/:serviceId/delete",
  pageController.deletePageService
);

router.get("/page/services/:pageId", pageController.getPageServices);
router.get("/page/service/:serviceId", pageController.getPageService);

router.post("/page", pageController.postPage);

router.post("/page/:pageId/company/story", pageController.postCompanyStory);
router.post(
  "/page/:pageId/company/team_cover",
  upload.single("my_file"),
  pageController.postCompanyPicture
);
router.post(
  "/page/:pageId/company/logo",
  upload.single("my_file"),
  pageController.postCompanyLogo
);
router.post(
  "/page/:pageId/company/cover",
  upload.single("my_file"),
  pageController.postCompanyCover
);
router.get("/page/:pageId/company", pageController.getCompany);

router.get("/page/:pageId/portfolio", pageController.getPagePortfolio);
router.get("/page/portfolio/:portfolioId", pageController.getPortfolio);
router.post("/page/portfolio/:pageId", pageController.PostPortfolio);
router.post(
  "/page/portfolio/:portfolioId/image",
  upload.single("my_file"),
  pageController.PostImage
);
router.put("/page/portfolio/:portfolioId/update", pageController.PutPortfolio);
router.delete(
  "/page/portfolio/:portfolioId/delete",
  pageController.DeletePortfolio
);

module.exports = router;
