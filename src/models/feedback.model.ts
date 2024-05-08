import pool from "../database";

interface IPerformance {
  name: string;
  value: number;
}

export default class Feedback {
  rating: number = 0;
  description: string = "";
  performance: string = "";
  constructor(rating: number, description: string, performance: string) {
    this.rating = rating;
    this.description = description;
    this.performance = performance;
  }

  async sendFeedback(project_id: string, page_id: string, user_id: string) {
    try {
      let result = await pool.query(
        "SELECT * FROM post_feedback($1,$2,$3,$4,$5,$6)",
        [
          project_id,
          this.description,
          this.rating,
          user_id,
          this.performance,
          page_id,
        ]
      );
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getFeedback() {}
}
