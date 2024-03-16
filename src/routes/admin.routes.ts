import express, { Request, Response } from "express";
import authenticationToken from "../middlewares/authentication.middleware";

const router = express.Router();
router.use(authenticationToken);
router.get("/admin/games", (request: Request, response: Response) => {
  response.send("Hello world");
});

router.post("/admin/games", (request: Request, response: Response) => {
  response.send("Hello world");
});
module.exports = router;
