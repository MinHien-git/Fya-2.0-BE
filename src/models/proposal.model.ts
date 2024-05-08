import pool from "../database";

export class Proposal {
  description: string;
  price: number;
  attachments: string;
  durations: string;

  constructor(
    description: string,
    price: number,
    attachments: string,
    durations: string
  ) {
    this.description = description;
    this.price = price;
    this.attachments = attachments;
    this.durations = durations;
  }

  async createProposal(page_id: string, project_id: string) {
    try {
      let result = (
        await pool.query("SELECT * FROM create_proposal($1,$2,$3,$4,$5,$6)", [
          page_id,
          project_id,
          this.description,
          this.price,
          this.attachments,
          this.durations,
        ])
      ).rows[0];
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getProposals(id: string) {
    try {
      let result = await pool.query(
        "SELECT * FROM get_all_agency_proposal($1)",
        [id]
      );
      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getProposalDetail(id: string) {
    try {
      let result = await pool.query("SELECT * FROM get_proposal_detail($1)", [
        id,
      ]);
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getProposalFeedbackDetail(id: string, project_id: string) {
    try {
      let _proposal = {};
      let _feedback = {};
      let result = pool.query(
        "SELECT * FROM get_proposal_feedback_detail($1)",
        [id]
      );
      let result2 = pool.query("SELECT * FROM get_project_feedback($1)", [
        project_id,
      ]);
      let data = await Promise.all([result, result2]).then((values) => {
        _proposal = values[0].rows[0];
        _feedback = values[1].rows[0];

        return values;
      });
      console.log(result);
      return { ..._feedback, ..._proposal };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async acceptProposal(_project_id: string, _proposal_id: string) {
    try {
      let result = await pool.query("SELECT * FROM accept_proposal($1,$2)", [
        _project_id,
        _proposal_id,
      ]);
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async rejectProposal(_proposal_id: string) {
    try {
      let result = await pool.query("SELECT * FROM decline_proposal($1)", [
        _proposal_id,
      ]);
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async completeProposal(_proposal_id: string) {
    try {
      let result = await pool.query(
        "SELECT * FROM mark_proposal_complete($1)",
        [_proposal_id]
      );
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async cancelProposal(_proposal_id: string) {
    try {
      let result = await pool.query(
        "SELECT * FROM cancel_proposal_complete($1)",
        [_proposal_id]
      );
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async onGoingProposal(user_id: string) {
    try {
      let result = await pool.query("SELECT * FROM get_ongoing_proposal($1)", [
        user_id,
      ]);
      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getCompletedProposal(user_id: string) {
    try {
      let result = await pool.query("SELECT * FROM get_complete_proposal($1)", [
        user_id,
      ]);
      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getWonProposal(page_id: string) {
    try {
      let result = await pool.query("SELECT * FROM get_project_won($1)", [
        page_id,
      ]);
      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static async getArchiveProposal(page_id: string) {
    try {
      let result = await pool.query("SELECT * FROM get_project_archived($1)", [
        page_id,
      ]);
      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getAgencyProposalDetail(id: string, project_id: string) {
    try {
      let _proposal = {};
      let _feedback = {};
      let result = pool.query("SELECT * FROM get_agency_proposal_detail($1)", [
        id,
      ]);
      let result2 = pool.query("SELECT * FROM get_user_feedback($1)", [
        project_id,
      ]);
      let data = await Promise.all([result, result2]).then((values) => {
        _proposal = values[0].rows[0];
        _feedback = values[1].rows[0];

        return values;
      });
      console.log(result);
      return { ..._proposal, ..._feedback };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
