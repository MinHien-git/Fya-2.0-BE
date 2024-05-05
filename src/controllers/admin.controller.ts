import { Request, Response } from "express";
import pool from "../database";

export async function getNewProject(request: Request, response: Response) {
  try {
    let result = (await pool.query("Select * from get_project_display()")).rows;
    console.log(result);
    if (result) {
      return response.json({
        data: result,
        message: "Get new Project",
        status: 200,
      });
    } else {
      return response.json({
        status: 400,
        message: "Cannot get new Project",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return response.json({
      status: 400,
      message: "Cannot get new Project",
      data: null,
    });
  }
}
