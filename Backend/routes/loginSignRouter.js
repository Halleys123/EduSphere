const express = require("express");
const { signUp, login } = require("../controllers/loginSignUpController");
const loginSignUpRouter = express.Router();
loginSignUpRouter.route("/signup").post(signUp);
loginSignUpRouter.route("/login").post(login);

module.exports = loginSignUpRouter;
