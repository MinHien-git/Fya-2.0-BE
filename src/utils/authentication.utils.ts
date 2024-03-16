import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../configs/authentication.config";

function generateAccessToken(user: any) {
  return jwt.sign(user, ACCESS_TOKEN, { expiresIn: "2h" });
}

export let authUtils = {
  generateAccessToken: generateAccessToken,
};
