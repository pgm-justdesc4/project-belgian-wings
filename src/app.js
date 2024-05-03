import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { getUser, getUserStats } from "./controllers/controllers.js";
import {
  createUser,
  loginUser,
  minigameFinished,
} from "./controllers/api/controllers.js";
import authregistervalidation from "./middleware/validation/authregistervalidation.js";
import authloginvalidation from "./middleware/validation/authloginvalidation.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/user", getUser);
app.get("/userStats", getUserStats);
app.post("/api/register", authregistervalidation, createUser);
app.post("/api/login", authloginvalidation, loginUser);
app.post("/api/minigameFinished", minigameFinished);

app.listen(port, () => {
  console.log("example app listening on port", `http://localhost:${port}`);
});
