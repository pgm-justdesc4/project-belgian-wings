import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  getUser,
  getAllUsers,
  getUserStats,
  getAllUserStats,
} from "./controllers/controllers.js";
import {
  createUser,
  loginUser,
  changePassword,
  minigameFinished,
  settingsChange,
  logout,
  addGuestUser,
} from "./controllers/api/controllers.js";
import authregistervalidation from "./middleware/validation/authregistervalidation.js";
import authloginvalidation from "./middleware/validation/authloginvalidation.js";
import passwordvalidation from "./middleware/validation/passwordvalidation.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/user", getUser);
app.get("/allUsers", getAllUsers);
app.get("/userStats", getUserStats);
app.get("/allUserStats", getAllUserStats);
app.post("/api/register", authregistervalidation, createUser);
app.post("/api/login", authloginvalidation, loginUser);
app.post("/api/logout", logout);
app.post("/api/addGuest", addGuestUser);
app.post("/api/minigameFinished", minigameFinished);
app.post("/api/resetPassword", passwordvalidation, changePassword);
app.post("/api/settingsChange", settingsChange);

app.listen(port, () => {
  console.log("example app listening on port", `http://localhost:${port}`);
});
