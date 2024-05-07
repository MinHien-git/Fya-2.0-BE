import { Request, Response } from "express";
import { Proposal } from "../models/proposal.model";

export async function submit_proposal(request: Request, response: Response) {
  let { description, attachments, durations, prices, page_id } = request.body;
  let { project_id } = request.params;
  if (request.user) {
    console.log(`submit_proposal: ${JSON.stringify(request.body)}`);

    let result = await new Proposal(
      description,
      prices,
      attachments,
      durations
    ).createProposal(page_id, project_id);

    if (result) {
      return response.json({
        message: "Successfully submitted proposal",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail submitted proposal",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function get_proposals(request: Request, response: Response) {
  if (request.user) {
    console.log(`submit_proposal: ${JSON.stringify(request.body)}`);

    let result = await Proposal.getProposals(request.user.id);

    if (result) {
      return response.json({
        message: "Successfully get proposals",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail get proposals",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function get_proposal_detail(
  request: Request,
  response: Response
) {
  if (request.user) {
    let { proposal_id } = request.params;
    let result = await Proposal.getProposalDetail(proposal_id);

    if (result) {
      return response.json({
        message: "Successfully get agency proposal details",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail get agency proposal details",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}
