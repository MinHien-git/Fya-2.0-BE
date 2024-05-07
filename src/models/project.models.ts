import pool from "../database";

export class Project {
  bugetRange?: string;
  companyName?: string;
  companySize?: string;
  companylocation?: string;
  industry?: string;
  languages?: string[];
  localization?: boolean;
  location?: string;
  position?: string;
  projectDescription?: string;
  projectDuration?: string;
  projectTitle?: string;
  services?: string[];
  skills?: string[];
  post_by?: string;

  constructor(
    bugetRange?: string,
    companyName?: string,
    companySize?: string,
    companylocation?: string,
    industry?: string,
    languages?: string[],
    localization?: boolean,
    location?: string,
    position?: string,
    projectDescription?: string,
    projectDuration?: string,
    projectTitle?: string,
    services?: string[],
    skills?: string[],
    post_by?: string
  ) {
    this.bugetRange = bugetRange;
    this.companyName = companyName;
    this.companySize = companySize;
    this.companylocation = companylocation;
    this.industry = industry;
    this.languages = languages;
    this.localization = localization;
    this.location = location;
    this.position = position;
    this.projectDescription = projectDescription;
    this.projectDuration = projectDuration;
    this.projectTitle = projectTitle;
    this.services = services;
    this.skills = skills;
    this.post_by = post_by;
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
      let result = await pool.query(
        "select * from post_project($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
        [
          this.projectTitle,
          this.projectDescription,
          this.post_by,
          0,
          this.projectDuration,
          this.services,
          this.skills,
          this.position,
          this.location,
          this.localization,
          this.languages,
          this.industry,
          this.companylocation,
          this.companySize,
          this.companyName,
          this.bugetRange,
        ]
      );
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

  static async getProjectDetailAgency(project_id: string) {
    try {
      let result = (
        await pool.query("select * from get_project_detail_agency($1,$2)", [
          project_id,
          false,
        ])
      ).rows[0];
      console.log("detail", result);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getUserProjectDetail(project_id: string) {
    try {
      let result = (
        await pool.query("select * from get_user_project_detail($1)", [
          project_id,
        ])
      ).rows[0];

      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getUserProjects(userId: String) {
    try {
      let result = await pool.query("select * from get_user_projects($1)", [
        userId,
      ]);
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
