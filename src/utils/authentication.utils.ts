import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../configs/authentication.config";

function generateAccessToken(user: any) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "2h",
  });
}

export let authUtils = {
  generateAccessToken: generateAccessToken,
};
