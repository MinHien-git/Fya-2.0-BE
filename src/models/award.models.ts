import pool from "../database";

export class Award {
  catergory: string;
  date: string;
  url: string;
  award_name: string;

  constructor(
    catergory: string,
    date: string,
    url: string,
    award_name: string
  ) {
    this.catergory = catergory;
    this.date = date;
    this.url = url;
    this.award_name = award_name;
  }

  async AddAward(pageId: string) {
    try {
      return await pool.query("SELECT * FROM add_award($1, $2, $3, $4,$5)", [
        this.catergory,
        this.date,
        this.url,
        pageId,
        this.award_name,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async UpdateAward(awardId: string) {
    try {
      return await pool.query("SELECT * FROM update_award($1, $2, $3, $4,$5)", [
        awardId,
        this.catergory,
        this.date,
        this.url,
        this.award_name,
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

  static async deleteAwards(awardId: string) {
    try {
      return (await pool.query("SELECT * FROM delete_award($1)", [awardId]))
        .rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
