import pool from "../database";

export class Project {
  title: string;
  description: string;
  post_by: string;
  _id?: string;
  _project_status?: string;

  constructor(title: string, description: string, posted_by: string) {
    this.title = title;
    this.description = description;
    this.post_by = posted_by;
  }

  static async getAllUserProject(user_id: string) {
    try {
      let result = await pool.query("select * from get_user_project($1)", [
        user_id,
      ]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async postProject() {
    try {
      let result = await pool.query("select * from post_project($1,$2,$3,$4)", [
        this.title,
        this.description,
        this.post_by,
        0,
      ]);
      console.log(result.rows[0].post_project);
      return result.rows[0].post_project;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getProjectDetail(project_id: string, user_id: string) {
    try {
      let result = await pool.query(
        "select * from get_project_detail($1,$2,$3)",
        [project_id, user_id, 0]
      );
      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
