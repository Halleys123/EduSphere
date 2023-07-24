const signUpRouter = require("express").Router();
const {
  signUpStarts,
  verificationOfLink,
} = require("../controllers/signUpControllers");
signUpRouter.route("/signupintitated").post(signUpStarts);
signUpRouter.route("/auth").get(verificationOfLink);
module.exports = signUpRouter;
