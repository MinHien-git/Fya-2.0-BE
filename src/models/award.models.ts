import pool from "../database";

export class Award {
  catergory: string;
  date: string;
  url: string;

  constructor(catergory: string, date: string, url: string) {
    this.catergory = catergory;
    this.date = date;
    this.url = url;
  }

  async AddAward(pageId: string) {
    try {
      return await pool.query("SELECT * FROM add_award($1, $2, $3, $4)", [
        this.catergory,
        this.date,
        this.url,
        pageId,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async UpdateAward(awardId: string) {
    try {
      return await pool.query("SELECT * FROM update_award($1, $2, $3, $4)", [
        awardId,
        this.catergory,
        this.date,
        this.url,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async GetAwards(pageId: string) {
    try {
      return (await pool.query("SELECT * FROM get_awards($1)", [pageId])).rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
