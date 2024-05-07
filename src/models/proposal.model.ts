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
}
