import express, { Request, Response } from "express";
import authenticationToken from "../middlewares/authentication.middleware";
import {
  AddSavePage,
  GetSavePage,
  RemoveSavePage,
} from "../controllers/user.controller";

const router = express.Router();
router.use("/user/", authenticationToken);

router.post("/user/save/:pageId", AddSavePage);

router.get("/user/save", GetSavePage);
router.put("/user/save/:pageId/delete", RemoveSavePage);

module.exports = router;
