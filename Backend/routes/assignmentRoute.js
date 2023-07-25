const express = require("express");
const auth = require("../utils/auth");
const {
  getData,
  postData,
  getDataMore,
} = require("../controllers/assignmentController");

const router = express.Router();

router.route("/assignments/").get(auth, getDataMore);
router.route("/assignments").post(postData);

module.exports = router;
