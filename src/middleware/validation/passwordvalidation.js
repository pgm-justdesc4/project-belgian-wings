import { body } from "express-validator";

export default [
  body("password").notEmpty().withMessage("Wachtwoord is verplicht"),
];