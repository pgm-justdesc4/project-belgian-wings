import user from "../../models/user.js";
import userStats from "../../models/user_stats.js";
import jwt from "jsonwebtoken";
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
    { id: loginUser.id, username: loginUser },
    process.env.JWT_SECRET
  );
  res.cookie("token", token, { httpOnly: true });

  res.redirect("/home");
}

export async function minigameFinished(req, res) {
  const user = await userStats.query().findOne({ user_id: req.user.id });

  const initialXp = 1000;
  const growthFactor = 1.2;

  const xpToNextLevel = initialXp * Math.pow(growthFactor, level - 1);

  const totalXp = req.body.xp + userStats.xp;
  const level = userStats.level;

  if (totalXp >= xpToNextLevel) {
    user.level += 1;
    user.xp = totalXp - xpToNextLevel;
  }

  await user.$query().patchAndFetch({ xp: user.xp });
  res.json({
    status: "success",
    message: "xp updated",
  });
}
