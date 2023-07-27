const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

// const ip = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  // console.log(`Server running at http://${ip}:${port}/`);
});
