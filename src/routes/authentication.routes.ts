import express, { Request, Response } from "express";
import { request } from "http";
import pool from "../database";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { REFRESH_TOKEN } from "../configs/authentication.config";
import { authUtils } from "../utils/authentication.utils";
import { error } from "console";
let authController = require("../controllers/authentication.controller");

const route = express.Router();

// route.post("/refreshtoken", (request: Request, response: Response) => {
//   try {
//     const refreshToken = request.body?.token;
//     if (refreshToken) return response.sendStatus(401);
//     if (!refreshToken.includes(refreshToken)) {
//       return response.sendStatus(403);
//     }
//     jwt.verify(refreshToken, REFRESH_TOKEN, async (error: any, user: any) => {
//       if (error) return response.sendStatus(403);

//       response.json({
//         user: user,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

route.delete("/logout/:token", authController.logoutController);

route.post("/signup", authController.signupController);

route.post("/signin", authController.signinController);
route.get("/getUserInformation", authController.getUserInformation);
module.exports = route;
