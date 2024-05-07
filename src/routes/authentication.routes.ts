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

route.delete("/logout/:token", authController.logoutController);

route.post("/signup", authController.signupController);

route.post("/signin", authController.signinController);
route.get("/getUserInformation", authController.getUserInformation);
module.exports = route;
