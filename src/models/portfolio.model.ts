import pool from "../database";

export class Portfolio {
  media: string;
  project_name: string;
  client_name: string;
  client_address: string;
  client_sector: string;
  budget: number;
  services: Array<string>;
  skills: Array<string>;
  description: string;
  start_date: string;
  end_date: string;
  is_working?: boolean;
  project_scope?: string;
  project_audience?: string;
  client_email?: string;
  project_id: string | null;
  result_link?: string;

  constructor(
    media: string,
    project_name: string,
    client_name: string,
    client_address: string,
    client_sector: string,
    budget: number,
    services: Array<string>,
    skills: Array<string>,
    description: string,
    start_date: string,
    end_date: string,
    is_working: boolean = false,
    project_scope: string = "",
    project_audience: string = "",
    client_email: string = "",
    project_id: string | null = null,
    result_link: string = ""
  ) {
    this.media = media;
    this.project_name = project_name;
    this.client_name = client_name;
    this.client_address = client_address;
    this.client_sector = client_sector;
    this.budget = budget;
    this.services = services;
    this.skills = skills;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.is_working = is_working;
    this.project_scope = project_scope;
    this.project_audience = project_audience;
    this.client_email = client_email;
    this.project_id = project_id;
    this.result_link = result_link;
  }

  async AddPortfolio(PageId: string) {
    try {
      let result = await pool.query(
        "select * from add_portfolio($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)",
        [
          PageId,
          this.media,
          this.project_name,
          this.client_name,
          this.client_address,
          this.client_sector,
          this.budget,
          this.services,
          this.skills,
          this.description,
          this.start_date,
          this.end_date,
          this.is_working,
          this.project_scope,
          this.project_audience,
          this.client_email,
          this.project_id,
          this.result_link,
        ]
      );

      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async GetPortfolio(PortfolioId: string) {
    try {
      let result = await pool.query("select * from get_portfolio($1)", [
        PortfolioId,
      ]);

      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async GetPagePortfolio(pageId: string) {
    try {
      let result = await pool.query("select * from get_page_portfolio($1)", [
        pageId,
      ]);

      console.log(result);
      return result.rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async PutPortfolio(PortfolioId: string) {
    try {
      let result = await pool.query(
        "select * from update_portfolio($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)",
        [
          PortfolioId,
          this.media,
          this.project_name,
          this.client_name,
          this.client_address,
          this.client_sector,
          this.budget,
          this.services,
          this.skills,
          this.description,
          this.start_date,
          this.end_date,
          this.is_working,
          this.project_scope,
          this.project_audience,
          this.client_email,
          this.project_id,
          this.result_link,
        ]
      );

      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async DeletePortfolio(PortfolioId: string) {
    try {
      let result = await pool.query("select * from delete_portfolio($1)", [
        PortfolioId,
      ]);

      console.log(result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async AddPortfolioImage(id: string, image: string) {
    try {
      return (
        await pool.query("SELECT * FROM add_portfolio_image($1,$2)", [
          id,
          image,
        ])
      ).rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
