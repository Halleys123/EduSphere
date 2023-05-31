const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const ip = process.env.IP || "192.168.137.152";
const port = process.env.PORT || 3000;

const server = app.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});
