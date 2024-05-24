import user from "../../models/user.js";
import userStats from "../../models/user_stats.js";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { validationResult } from "express-validator";

export async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "error",
      ...errors,
    });
  }

  if (!user.query().findOne({ email: req.body.email })) {
    return res.json({
      status: "error",
      message: "User already exists",
    });
  }

  const newUser = await createUserStats();
  const username = `user${Math.random() * 1000000000000}`;

  req.body.email = req.body.email.toLowerCase();
  await user
    .query()
    .insert({ ...req.body, user_stats_id: newUser.id, username: username });
  res.redirect("/login");
}

async function createUserStats() {
  const newUserStats = await userStats.query().insert({});
  return newUserStats;
}

export async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "error",
      ...errors,
    });
  }

  req.body.email = req.body.email.toLowerCase();
  if (!(await user.query().findOne({ email: req.body.email }))) {
    return res.json({
      status: "error",
      message: "User does not exist",
    });
  }

  const loginUser = await user.query().findOne({ email: req.body.email });

  if (loginUser.password != req.body.password) {
    return res.json({
      status: "error",
      message: "Password is incorrect",
    });
  }
  const token = jwt.sign(
    {
      id: loginUser.id,
      user_stats_id: loginUser.user_stats_id,
      username: loginUser.username,
      email: loginUser.email,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token, { httpOnly: true });

  res.redirect("/home");
}

export async function minigameFinished(req, res) {
  const decoded = jwtDecode(req.cookies.token);
  const user = await userStats.query().findOne({ id: decoded.user_stats_id });

  const initialXp = 1000;
  const growthFactor = 1.2;

  const xpToNextLevel = initialXp * Math.pow(growthFactor, user.level - 1);

  const totalXp = req.body.xp + user.xp;
  console.log(totalXp);
  let level = parseInt(user.level);

  if (totalXp >= xpToNextLevel) {
    level = level + 1;
    totalXp -= xpToNextLevel;
    console.log("level up");
    const xpToNextLevel = initialXp * Math.pow(growthFactor, level - 1);
    if (totalXp >= xpToNextLevel) {
      level = level + 1;
      totalXp -= xpToNextLevel;
      console.log("level up");
    }
  }

  console.log(level, totalXp);
  await userStats
    .query()
    .findOne({ id: user.id })
    .patch({ level: level, xp: totalXp });
  console.log("xp updated");
  res.json({
    status: "success",
    message: "xp updated",
  });
}

export async function changePassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "error",
      ...errors,
    });
  }

  await user
    .query()
    .patchAndFetchById(req.user.id, { password: req.body.password });
  res.redirect("/login");
}
