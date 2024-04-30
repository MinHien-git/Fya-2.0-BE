import pool from "../database";
import * as bcrypt from "bcrypt";
import { authUtils } from "../utils/authentication.utils";
import { REFRESH_TOKEN } from "../configs/authentication.config";
import * as jwt from "jsonwebtoken";

export class User {
  email: string;
  password: string;
  fname: string;
  lname: string;
  id: string;
  lisence_id?: string;
  constructor(
    _email: string,
    _password: string,
    _fname: string = "",
    _lname: string = "",
    _id: string = ""
  ) {
    this.email = _email;
    this.password = _password;
    this.fname = _fname;
    this.lname = _lname;
    this.id = _id;
  }

  async signin() {
    try {
      const result = await pool.query("SELECT * FROM signin($1)", [this.email]);

      const user: User = result.rows[0];
      console.log(result, this);
      if (user?.email != null) {
        if (bcrypt.compareSync(this.password, user.password)) {
          const accesstoken = authUtils.generateAccessToken(user);
          const refreshToken = jwt.sign({ ...user }, REFRESH_TOKEN, {
            expiresIn: "31d",
          });

          await pool.query("Select * FROM add_token($1)", [refreshToken]);

          return {
            accesstoken,
            refreshToken,
            user,
          };
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
    return null;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    try {
      const result = await pool.query("SELECT * FROM signup($1, $2, $3,$4)", [
        this.email,
        hashedPassword,
        this.fname,
        this.lname,
      ]);
      let user: User = result.rows[0];
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
