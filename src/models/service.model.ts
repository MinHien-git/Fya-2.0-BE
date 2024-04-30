import pool from "../database";

export class Service {
  services: string;
  description: string;
  price: number;
  skills: Array<string>;

  constructor(
    services: string,
    description: string,
    price: number,
    skills: Array<string>
  ) {
    this.services = services;
    this.description = description;
    this.price = price;
    this.skills = skills;
  }
  static async getService(serviceId: string) {
    try {
      return (await pool.query("SELECT * FROM get_service($1)", [serviceId]))
        .rows[0];
    } catch {
      return null;
    }
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
    try {
      return await pool.query(
        "SELECT * FROM update_service($1, $2, $3, $4,$5)",
        [serviceId, this.services, this.skills, this.description, this.price]
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteService(serviceId: string) {
    try {
      return (await pool.query("SELECT * FROM delete_service($1)", [serviceId]))
        .rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
