import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import bodyParser from "body-parser";
import { getUser } from "./controllers/controllers";
import authregistervalidation from "./middleware/validation/authregistervalidation";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/user", getUser);
app.get("/userStats", getUserStats);
app.post("/api/addUser", authregistervalidation, createUser);
app.post("/api/login", authloginvalidation, loginUser);

app.listen(port, () => {
  console.log("example app listening on port", `http://localhost:${port}`);
});
