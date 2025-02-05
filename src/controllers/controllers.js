import user from "../models/user.js";
import userStats from "../models/user_stats.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export async function getUser(req, res) {
  const decoded = jwtDecode(req.cookies.token);
  const foundUser = await user.query().findOne("id", decoded.id);
  res.send(foundUser);
}

export async function getAllUsers(req, res) {
  const allUsers = await user.query();
  res.send(allUsers);
}

export async function getUserStats(req, res) {
  const decoded = jwtDecode(req.cookies.token);
  const foundUserStats = await userStats
    .query()
    .findOne("id", decoded.user_stats_id);
  res.send(foundUserStats);
}

export async function getAllUserStats(req, res) {
  const allUserStats = await userStats.query();
  res.send(allUserStats);
}
