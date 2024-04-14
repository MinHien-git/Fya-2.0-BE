import pool from "../database";

export class Service {
  services: Array<string>;
  description: string;
  price: number;
  skills: Array<string>;

  constructor(
    services: Array<string>,
    description: string,
    price: number,
    skills: Array<string>
  ) {
    this.services = services;
    this.description = description;
    this.price = price;
    this.skills = skills;
  }

  static async getServices(pageId: string) {
    try {
      return (await pool.query("SELECT * FROM get_services($1)", [pageId]))
        .rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addService(pageId: string) {
    try {
      return await pool.query("SELECT * FROM add_service($1, $2, $3, $4,$5)", [
        this.services,
        this.skills,
        this.description,
        this.price,
        pageId,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateService(serviceId: String) {
    //   try {
    //     return await pool.query("SELECT * FROM update_award($1, $2, $3, $4,$5)", [
    //       awardId,
    //       this.catergory,
    //       this.date,
    //       this.url,
    //       this.award_name,
    //     ]);
    //   } catch (error) {
    //     console.log(error);
    //     return null;
    //   }
    return null;
  }

  static async deleteService(serviceId: string) {
    try {
      return (await pool.query("SELECT * FROM delete_award($1)", [serviceId]))
        .rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
