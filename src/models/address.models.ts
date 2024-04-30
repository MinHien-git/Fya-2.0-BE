import pool from "../database";

export class Address {
  description: string;

  constructor(description: string) {
    this.description = description;
  }

  async AddAddress(pageId: string) {
    try {
      return await pool.query("SELECT * FROM add_addition_address($1,$2)", [
        this.description,
        pageId,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async UpdateAddress(addressId: string) {
    try {
      return await pool.query("SELECT * FROM update_addition_address($1,$2)", [
        this.description,
        addressId,
      ]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async GetAddresses(pageId: string) {
    try {
      return (
        await pool.query("SELECT * FROM get_addition_address($1)", [pageId])
      ).rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async deleteAddress(addressId: string) {
    try {
      return (
        await pool.query("SELECT * FROM delete_addition_address($1)", [
          addressId,
        ])
      ).rows;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
