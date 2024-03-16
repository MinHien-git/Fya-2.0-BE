import { Request, Response } from "express";
import { User } from "../models/user.model";
import pool from "../database";

async function signinController(request: Request, response: Response) {
  const { email, password } = request.body;
  let user = new User(email, password);
  let result = await user.signin();
  if (result != null) {
    return response.json({
      data: { ...result },
      message: "Login successfully",
    });
  } else {
    return response.json({
      message: "Login failed",
      data: null,
    });
  }
}

async function signupController(request: Request, response: Response) {
  const { name, email, password } = request.body;
  let user = new User(email, password, name);
  let result = await user.signup();
  if (result?.email != null) {
    return response.json({
      data: { ...result },
      message: "Sign up successfully",
    });
  } else {
    return response.json({
      message: "Sign up failed",
      data: null,
    });
  }
}

async function logoutController(request: Request, response: Response) {
  await pool.query("Select * FROM remove_token($1)", [request.body.token]);
  response.sendStatus(204);
}

module.exports = {
  signinController: signinController,
  signupController: signupController,
  logoutController: logoutController,
};
