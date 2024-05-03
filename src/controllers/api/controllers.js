import user from "../models/user.js";
import userStats from "../models/userStats.js";
import jwt from "jsonwebtoken";

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

  await user.query().insert(req.body);
  res.redirect("/login");
}

export async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      status: "error",
      ...errors,
    });
  }

  if (!(await user.query().findOne({ email: req.body.email }))) {
    return res.json({
      status: "error",
      message: "User does not exist",
    });
  }

  const loginUser = await user.query().findOne({ email: req.body.email });

  if (loginUser !== req.body.password) {
    return res.json({
      status: "error",
      message: "Password is incorrect",
    });
  }
  const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true });

  res.redirect("/home");
}

export async function minigameFinished(req, res) {
  const userStats = await userStats.query().findOne({ user_id: req.user.id });

  const initialXp = 1000;
  const growthFactor = 1.2;

  const xpToNextLevel = initialXp * Math.pow(growthFactor, level - 1);

  const totalXp = req.body.xp + userStats.xp;
  const level = userStats.level;

  if (totalXp >= xpToNextLevel) {
    userStats.level += 1;
    userStats.xp = totalXp - xpToNextLevel;
  }

  await userStats.$query().patchAndFetch({ xp: userStats.xp });
  res.json({
    status: "success",
    message: "xp updated",
  });
}
