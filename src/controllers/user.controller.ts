import pool from "../database";
import * as bcrypt from "bcrypt";
import { authUtils } from "../utils/authentication.utils";
import { REFRESH_TOKEN } from "../configs/authentication.config";
import * as jwt from "jsonwebtoken";

export class User {
  email: string;
  password: string;
  name: string;
  id: string;
  role: number;
  constructor(
    _email: string,
    _password: string,
    _name: string = "",
    _id: string = "",
    _role: number = 0
  ) {
    this.email = _email;
    this.password = _password;
    this.name = _name;
    this.id = _id;
    this.role = _role;
  }

  async signin() {
    try {
      const result = await pool.query("SELECT * FROM signin($1)", [this.email]);

      const user: User = result.rows[0];
      if (user.email != null) {
        if (bcrypt.compareSync(this.password, user.password)) {
          const accesstoken = authUtils.generateAccessToken(user);
          const refreshToken = jwt.sign(user, REFRESH_TOKEN, {
            expiresIn: "31d",
          });

          await pool.query("Select * FROM addtoken($1)", [refreshToken]);

          return {
            accesstoken,
            refreshToken,
            ...user,
          };
        }
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    try {
      const result = await pool.query("SELECT * FROM signup($1, $2, $3)", [
        this.name,
        this.email,
        hashedPassword,
      ]);
      let user: User = result.rows[0];
      return user;
    } catch (error) {
      return null;
    }
  }
}
