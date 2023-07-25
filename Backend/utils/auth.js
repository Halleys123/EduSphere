const CustomError = require("./CustomErrorClass");
const userSchema = require("../model/userSchema");
const jwtVerification = require("./jwtVerification");
const createUserModel = require("./createUserModel");
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authentication;

    if (!authHeader) throw new CustomError("no auth header", 403);
    else if (authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      const jwtDecoded = await jwtVerification(
        token,
        process.env.LOGIN_JWT_SECRET
      );
      const userModel = await createUserModel(jwtDecoded.collectionName);
      const user = await userModel.findById(jwtDecoded.id).select("-password");
      if (user && user.logInCounter == jwtDecoded.logInCounter) {
        req.collectionName = jwtDecoded.collectionName;
        req.user = user;
        next();
      } else {
        throw new CustomError("you have old jwt log in again", 403);
      }
    }
  } catch (err) {
    // console.log(err);
    return next(err);
  }
};
module.exports = auth;
