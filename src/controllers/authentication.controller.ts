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
  const { lname, fname, email, password } = request.body;
  let user = new User(email, password, fname, lname);
  let result = await user.signup();
  if (result?.email != null) {
    return response.json({
      data: { ...result },
      message: "Sign up successfully",
      status: 200,
    });
  } else {
    return response.json({
      status: 400,
      message: "Sign up failed",
      data: null,
    });
  }
}

async function getUserInformation(request: Request, response: Response) {
  if (request.user) {
    return response.json({
      data: request.user,
      message: "Get user successfully",
      status: 200,
    });
  } else {
    return response.status(400).json({
      data: null,
      message: "Failed to get user",
      status: 400,
    });
  }
}

async function logoutController(request: Request, response: Response) {
  let { token } = request.params;
  await pool.query("Select * FROM remove_token($1)", [token]);
  response.sendStatus(204);
}

module.exports = {
  signinController: signinController,
  signupController: signupController,
  logoutController: logoutController,
  getUserInformation: getUserInformation,
};
