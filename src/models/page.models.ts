import pool from "../database";

export default class Page {
  address: string = "";
  company_name: string = "";
  description: string = "";
  email_address: String = "";
  founded_date: string = "";
  languages: Array<string> = [];
  phone_number: string = "";
  team_members: string = "";
  website: string = "";
  createdBy: string = "";
  constructor(
    address: string = "",
    company_name: string = "",
    description: string = "",
    email_address: String = "",
    founded_date: string = "",
    languages: Array<string> = [],
    phone_number: string = "",
    team_members: string = "",
    website: string = "",
    createdBy: string = ""
  ) {
    this.address = address;
    this.company_name = company_name;
    this.description = description;
    this.email_address = email_address;
    this.founded_date = founded_date;
    this.languages = languages;
    this.phone_number = phone_number;
    this.team_members = team_members;
    this.website = website;
    this.createdBy = createdBy;
  }
  static async getPages() {
    try {
      let result = await pool.query("select * from get_pages()");
      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createPage() {
    try {
      let result = await pool.query(
        "select * from create_page($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)",
        [
          this.address,
          this.company_name,
          this.description,
          this.email_address,
          this.founded_date,
          this.languages,
          this.phone_number,
          this.team_members,
          this.website,
          this.createdBy,
        ]
      );
      console.log(result.rows[0].create_page);
      return result.rows[0].create_page;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
