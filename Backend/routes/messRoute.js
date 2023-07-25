const express = require("express");
const auth = require("../utils/auth");
const { getData } = require("../controllers/messController");
const router = express.Router();
router.route("/mess/:hostel").get(auth, getData);
module.exports = router;
