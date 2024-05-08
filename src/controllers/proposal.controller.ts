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

export async function get_proposal_feedback_detail(
  request: Request,
  response: Response
) {
  if (request.user) {
    let { proposal_id, project_id } = request.params;
    let result = await Proposal.getProposalFeedbackDetail(
      proposal_id,
      project_id
    );

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

export async function accept_proposal(request: Request, response: Response) {
  if (request.user) {
    let { proposal_id, project_id } = request.params;
    let result = await Proposal.acceptProposal(project_id, proposal_id);

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

export async function reject_proposal(request: Request, response: Response) {
  if (request.user) {
    let { proposal_id } = request.params;
    let result = await Proposal.rejectProposal(proposal_id);

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

export async function complete_proposal(request: Request, response: Response) {
  if (request.user) {
    let { proposal_id } = request.params;
    let result = await Proposal.completeProposal(proposal_id);

    if (result) {
      return response.json({
        message: "Successfully mark agency proposal completed",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail mark agency proposal completed",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function cancel_proposal(request: Request, response: Response) {
  if (request.user) {
    let { proposal_id } = request.params;
    let result = await Proposal.completeProposal(proposal_id);

    if (result) {
      return response.json({
        message: "Successfully cancel proposal",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail to cancel proposal",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function ongoing_proposal(request: Request, response: Response) {
  if (request.user) {
    let result = await Proposal.onGoingProposal(request.user.id);

    if (result) {
      return response.json({
        message: "Successfully get ongoing proposal details",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail get ongoing proposal details",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function get_completed_proposal(
  request: Request,
  response: Response
) {
  if (request.user) {
    let result = await Proposal.getCompletedProposal(request.user.id);

    if (result) {
      return response.json({
        message: "Successfully get complete proposal",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail get complete proposal",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function get_won_proposal(request: Request, response: Response) {
  if (request.user) {
    let { page_id } = request.params;
    let result = await Proposal.getWonProposal(page_id);

    if (result) {
      return response.json({
        message: "Successfully get won proposal",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail get won proposal",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function get_archived_proposal(
  request: Request,
  response: Response
) {
  if (request.user) {
    let { page_id } = request.params;
    let result = await Proposal.getArchiveProposal(page_id);

    if (result) {
      return response.json({
        message: "Successfully get won proposal",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail get won proposal",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}

export async function get_agency_proposal_detail(
  request: Request,
  response: Response
) {
  if (request.user) {
    let { proposal_id, project_id } = request.params;
    let result = await Proposal.getAgencyProposalDetail(
      proposal_id,
      project_id
    );

    if (result) {
      return response.json({
        message: "Successfully view proposal details",
        data: result,
      });
    } else {
      return response.status(400).json({
        message: "Fail view proposal details",
        data: null,
      });
    }
  } else {
    return response.status(403);
  }
}
