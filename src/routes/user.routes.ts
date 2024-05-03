import express, { Request, Response } from "express";
import { GetPage, GetPages } from "../controllers/user.controller";

const router = express.Router();

router.get("/user/pages", GetPages);
router.get("/page/:id", GetPage);

router.get("/user/top/pages", GetPages);
router.get("/user/page/:pageid", (request: Request, response: Response) => {});
router.get("/user/pages/search", (request: Request, response: Response) => {});

module.exports = router;
