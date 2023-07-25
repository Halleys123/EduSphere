const userSchema = require("../model/userSchema");
const createUserModel = require("../utils/createUserModel");
const CustomError = require("../utils/CustomErrorClass");
const bcrypt = require("bcrypt");
const createToken = require("../utils/jwtCreation");
const emailModel = require("../model/emailModel");
const userModel = require("../utils/createUserModel");
const loginController = async (req, res, next) => {
  try {
    const { email, password, collectionName } = req.body;

    const userFromEmailModel = await emailModel.findOne({
      collectionName,
      email,
    });
    if (!userFromEmailModel) throw new CustomError("user does not exisit", 412);
    else {
      const userModel = createUserModel(collectionName, userSchema);
      const user = await userModel.findOne({ email });
      if (!user) throw new CustomError("user does not exisit", 412);
      else {
        const isMatch = await bcrypt.compare(password, user.password);
        const token = createToken(
          {
            id: user._id,
            collectionName: collectionName,
            logInCounter: user.logInCounter,
          },
          process.env.LOGIN_JWT_SECRET,
          process.env.LOGIN_JWT_MAX_AGE
        );
        if (isMatch) {
          res.json({
            success: true,
            message: {
              data: user,
              token: token,
            },
          });
        }
      }
    }
  } catch (err) {
    return next(err);
  }
};
module.exports = loginController;
