const logInRouter = require("express").Router();
const loginController = require("../controllers/loginControler");
logInRouter.route("/login").post(loginController);
module.exports = logInRouter;
