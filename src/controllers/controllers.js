import user from "../models/user.js";
import userStats from "../models/user_stats.js";

export async function getUser(req, res) {
  const foundUser = await user.query().findOne("id", req.body.id);
  return (res.body.foundUser = foundUser);
}

export async function getUserStats(req, res) {
  const decoded = jwtDecode(req.cookies.token);
  const foundUserStats = await userStats.query().findOne("id", decoded.id);
  return (res.body.foundUserStats = foundUserStats);
}
