import pool from "../database";

export default class Company {
  page_id: string;
  logo: string;
  cover: string;
  team_cover: string;
  story: string;

  constructor(
    page_id: string,
    logo: string = "",
    cover: string = "",
    team_cover: string = "",
    story: string = ""
  ) {
    this.cover = cover;
    this.page_id = page_id;
    this.logo = logo;
    this.team_cover = team_cover;
    this.story = story;
  }
  async GetCompany() {
    try {
      return (
        await pool.query("SELECT * FROM add_company_information($1)", [
          this.page_id,
        ])
      ).rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async AddLogo() {
    try {
      return await pool.query("SELECT * FROM add_company_logo($1,$2)", [
        this.page_id,
        this.logo,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async AddStory() {
    try {
      return await pool.query("SELECT * FROM add_company_description($1,$2)", [
        this.page_id,
        this.story,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async AddCover() {
    try {
      return (
        await pool.query("SELECT * FROM add_company_cover($1,$2)", [
          this.page_id,
          this.cover,
        ])
      ).rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async AddTeamCover() {
    try {
      return (
        await pool.query("SELECT * FROM add_company_picture($1,$2)", [
          this.page_id,
          this.team_cover,
        ])
      ).rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
