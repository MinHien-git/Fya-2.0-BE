import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as jwt from "jsonwebtoken";
import pool from "./database";
import { authUtils } from "./utils/authentication.utils";

dotenv.config();

const app = express();
const port = process.env.PORT;
let bodyParser = require("body-parser");

const authenticationRoute = require("./routes/authentication.routes");
const projectRoute = require("./routes/project.routes");
const adminRoute = require("./routes/admin.routes");
const pageRoute = require("./routes/page.routes");

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/token", async (request: Request, response: Response) => {
  console.log(process.env.REFRESH_TOKEN_SECRET!);
  try {
    const refreshToken = request.body.token;
    if (refreshToken == null) return response.sendStatus(401);
    let rs = await pool.query("Select * from get_token($1)", [refreshToken]);
    if (!rs) {
      return response.sendStatus(403);
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (error: any, user: any) => {
        if (error) return response.sendStatus(403);

        // await pool.query("Select * FROM remove_token($1)", [refreshToken]);

        // const newRfToken = jwt.sign({ ...user }, REFRESH_TOKEN, {
        //   expiresIn: "30d",
        // });
        const accesstoken = authUtils.generateAccessToken({
          email: user.email,
        });

        // await pool.query("Select * FROM add_token($1)", [newRfToken]);

        response.json({
          accesstoken: accesstoken,
          // refreshToken: newRfToken,
          user: user,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.use(authenticationRoute);
app.use(projectRoute);
app.use(pageRoute);
const pageController = require("./controllers/page.controller");

app.get("/page", pageController.getPages);
//Admin route
app.use(adminRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
