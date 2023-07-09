const assignmentRoute = require("./routes/assignmentRoute");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/v1", assignmentRoute);

module.exports = app;
