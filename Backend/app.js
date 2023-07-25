const assignmentRoute = require("./routes/assignmentRoute");
const CustomError = require("./utils/CustomErrorClass");
const errorHandler = require("./utils/errorHandlerMiddleware");
const messRoute = require("./routes/messRoute");
const signUpRouter = require("./routes/signUpRouter");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logInRouter = require("./routes/loginRouter");
const fetchUserRouter = require("./routes/fetchUser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", assignmentRoute);
app.use("/api/v1", messRoute);
app.use("/api/v1", signUpRouter);
app.use("/api/v1", logInRouter);
app.use("/api/v1", fetchUserRouter);

app.all("*", (req, res, next) => {
  const err = new CustomError("Page not found", 404);
  next(err);
});
app.use(errorHandler);
module.exports = app;
