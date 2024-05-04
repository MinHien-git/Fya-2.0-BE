import express, { Request, Response } from "express";
import authenticationToken from "../middlewares/authentication.middleware";
import {
  AddSavePage,
  GetSavePage,
  RemoveSavePage,
} from "../controllers/user.controller";

const router = express.Router();
router.use(authenticationToken);

router.post("user/save/:pageId", AddSavePage);

router.get("user/save/:id", GetSavePage);
router.put("user/save/:id/delete", RemoveSavePage);

export default router;
