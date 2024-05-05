import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../configs/authentication.config";
import { User } from "../models/user.model";

function authenticationToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers["authorization"];
  console.log("called");
  const token = authHeader && authHeader?.split(" ")[1];
  if (token == null) return response.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN, (err, user: any) => {
    console.log(err);
    if (err) return response.sendStatus(403);
    request.user = user;
    next();
  });
}

export default authenticationToken;
