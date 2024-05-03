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
  turnover: string = "USD";
  tagline: string = "";
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
    createdBy: string = "",
    tagLine = "",
    turnover = "USD"
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
    this.tagline = tagLine;
    this.turnover = turnover;
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

  static async getPage(_id: string) {
    let pageInfo;
    let companyInfo;
    let awards;
    let services;
    let portifolio;
    try {
      let resultInfo = pool.query("Select * from get_brand_page($1)", [_id]);
      let resultCompany = pool.query(
        "Select * from add_company_information($1)",
        [_id]
      );
      let resultAwards = pool.query("Select * from get_awards($1)", [_id]);
      let resultService = pool.query("Select * from get_services($1)", [_id]);
      let resultPortifolio = pool.query("Select * from get_portfolios($1)", [
        _id,
      ]);
      let data = await Promise.all([
        resultInfo,
        resultCompany,
        resultAwards,
        resultService,
        resultPortifolio,
      ]).then((values) => {
        pageInfo = values[0].rows[0];
        companyInfo = values[1].rows[0];
        awards = values[2].rows;
        services = values[3].rows;
        portifolio = values[4].rows;
        return values;
      });
      return {
        pageInfo,
        companyInfo,
        awards,
        services,
        portifolio,
      };
      // return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getManageDetail(_id: string) {
    try {
      let result = await pool.query("Select * from get_page($1)", [_id]);
      console.log(result);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async UpdatePageAbout(_id: string) {
    try {
      let result = await pool.query(
        "Select * from update_agency_about($1,$2,$3,$4,$5,$6,$7,$8)",
        [
          this.company_name,
          this.turnover,
          this.languages,
          this.founded_date,
          _id,
          this.tagline,
          this.description,
          this.team_members,
        ]
      );
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
