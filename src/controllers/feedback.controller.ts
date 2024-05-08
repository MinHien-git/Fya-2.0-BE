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
