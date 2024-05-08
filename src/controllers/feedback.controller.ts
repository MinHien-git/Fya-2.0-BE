import { Request, Response } from "express";
import Feedback from "../models/feedback.model";

export async function postFeedback(request: Request, response: Response) {
  if (request.user) {
    let { project_id, page_id } = request.params;
    let { description, rating, performance } = request.body;
    console.log(`postFeedback: ${JSON.stringify(performance)}`);
    let result = await new Feedback(
      rating,
      description,
      JSON.stringify(performance)
    ).sendFeedback(project_id, page_id, request.user.id);

    if (result) {
      return response.json({
        message: "Successfully sent feedback",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "sent feedback Fail",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function postUserFeedback(request: Request, response: Response) {
  if (request.user) {
    let { project_id } = request.params;
    let { note, rating, client_rate } = request.body;

    let result = await new Feedback(
      rating,
      note,
      JSON.stringify(client_rate)
    ).sendUserFeedback(project_id);

    if (result) {
      return response.json({
        message: "Successfully sent user feedback",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "sent feedback user Fail",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}
