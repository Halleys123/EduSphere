const assignmentRoute = require("./routes/assignmentRoute");
const messRoute = require("./routes/messRoute");

const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", assignmentRoute);
app.use("/api/v1", messRoute);

module.exports = app;
