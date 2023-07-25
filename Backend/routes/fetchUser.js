const fetchUserRouter = require("express").Router();
const fetchUser = require("../controllers/fetchUser");
fetchUserRouter.route("/fetchUser").get(fetchUser);
module.exports = fetchUserRouter;
