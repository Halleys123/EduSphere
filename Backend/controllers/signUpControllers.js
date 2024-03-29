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
    console.log(req.body);
    let { password, email, name, section, session, hostel } = req.body;
    if (!(email && password && name && section && session && hostel)) {
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
      hostel,
    });
    const token = createToken(
      { id: user._id },
      process.env.SIGN_UP_LINK_SECRET,
      process.env.EMAIL_TOKEN_MAX_AGE
    );
    const emailOptions = {
      email: user.email,
      subject: "EduSphere Authentication",
      body: `EduSphere: Thank you ${user.name}, for prompting in EduSphere for personal Growth${req.protocol}://${req.headers.host}/api/v1/auth?token=${token} (please don't click on the link if this signUp process has not been initiated by you)`,
      html: `<h1 style="color:black">EduSphere<h1><h3 style="color:black">Thanks you ${user.name}, for prompting in EduSphere for personal Growth </h3><h3style="color:black">If its you click on the button for verification</h3style=><br><br><a href="${req.protocol}://${req.headers.host}/api/v1/auth?token=${token}" style="background-color: #003681;
      text-decoration:none;
      width: 15rem;
      height: 6.4rem;
      border-radius: 0.4rem;
      border: none;
      outline: none;
      color: #fff;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      margin-top: 3.2rem;">Authenticate Me</a> (please don't click on the link if this signUp process has not been initiated by you)</h2>`,
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
    const user = await jwtVerification(token, process.env.SIGN_UP_LINK_SECRET);

    const id = user.id;
    console.log(user);
    const temporaryUser = await temporaryUserSchema.findById(id);
    if (!temporaryUser) {
      throw new CustomError("SignUp unsuccessful", 401);
    } else {
      console.log(temporaryUser);
      const users = createUserModel(temporaryUser.collectionName);
      await emailSchema.create({
        email: temporaryUser.email,
        collectionName: temporaryUser.collectionName,
      });
      const signedUpUser = await users.create({
        email: temporaryUser.email,
        password: temporaryUser.password,
        name: temporaryUser.name,
        hostel: temporaryUser.hostel,
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
      // console.log(frontendURL);
      res.redirect(
        `http://127.0.0.1:5501/Frontend/pages/dashboard/index.html?token=${token}`
      );
    }
  } catch (err) {
    console.log("fuck");
    res.redirect(
      "http://127.0.0.1:5501/Frontend/pages/Signup/signup.html?error=1"
    );
    next(err);
  }
};
module.exports = { signUpStarts, verificationOfLink };
