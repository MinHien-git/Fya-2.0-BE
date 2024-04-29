import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
