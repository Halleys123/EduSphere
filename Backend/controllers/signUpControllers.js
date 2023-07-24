const temporaryUserSchema = require("../model/temporaryUserSchema");
const userSchema = require("../model/userSchema");
const createUserModel = require("../utils/createUserModel");
const CustomError = require("../utils/CustomErrorClass");
const createToken = require("../utils/jwtCreation");
const hashPassword = require("../utils/hashPassword");
const sendMail = require("../utils/sendMail");
const jwtVerification = require("../utils/jwtVerification");
const emailSchema = require("../model/emailModel");
const signUpStarts = async (req, res, next) => {
  try {
    let { password, email, name, section, session, phone } = req.body;
    if (!(email && password && name && section && session && phone)) {
      throw new CustomError("Please enter all the credentials", 400);
    }

    if (await emailSchema.findOne({ email })) {
      console.log("hello");
      throw new CustomError("User Already exists", 403);
    }
    password = await hashPassword(password);
    const user = await temporaryUserSchema.create({
      password,
      email,
      name,
      collectionName: `${session}${section}`,
    });
    const token = createToken(
      { id: user._id },
      process.env.SIGN_UP_LINK_SECRET,
      process.env.EMAIL_TOKEN_MAX_AGE
    );
    console.log(req);
    const emailOptions = {
      email: user.email,
      subject: "Sign up to Edusphere",
      body: `Thanks for filling in the correct details in EduSphere Now click on this link so that we can authenticate that it was you ${req.protocol}://${req.headers.host}/api/v1/auth?token=${token} (please don't click on the link if this signUp process has not been initiated by you)`,
      html: `<h2>Thanks for filling in the correct details in EduSphere Now click on this link so that we can authenticate that it was you ${req.protocol}://${req.headers.host}/api/v1/auth?token=${token} (please don't click on the link if this signUp process has not been initiated by you)</h2>`,
    };
    sendMail(emailOptions);
    res.status(201).json({
      success: true,
      err: null,
      status: "success",
      message: "signUp Link sent successfully ",
      statusCode: 201,
    });
  } catch (err) {
    console.error("Error:", err.message);
    if (err.code === 11000) {
      err.message = "user Already exists";
    }
    return next(err);
  }
};

const verificationOfLink = async (req, res, next) => {
  try {
    const token = req.query.token;
    const user = await jwtVerification(
      token,
      process.env.SIGN_UP_LINK_SECRET,
      process.env
    );

    const id = user.id;
    const temporaryUser = await temporaryUserSchema.findById(id);
    if (!temporaryUser) {
      const err = new CustomError("SignUp unsuccessful", 401);
      return next(err);
    } else {
      console.log(temporaryUser);
      const users = createUserModel(temporaryUser.collectionName);
      await emailSchema.create({ email: temporaryUser.email });
      const signedUpUser = await users.create({
        email: temporaryUser.email,
        password: temporaryUser.password,
        name: temporaryUser.name,
        logInCounter: 1,
      });

      await temporaryUserSchema.findByIdAndDelete(id);
      const token = createToken(
        {
          id: signedUpUser._id,
          logInCounter: signedUpUser.logInCounter,
          collectionName: temporaryUser.collectionName,
        },
        process.env.LOGIN_JWT_SECRET,
        process.env.LOGIN_JWT_MAX_AGE
      );

      res.status(201).json({
        success: true,
        err: null,
        status: "success",
        message: {
          data: signedUpUser,
          token: token,
          remarks: "User registered success fully",
        },
        statusCode: 201,
      });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { signUpStarts, verificationOfLink };
