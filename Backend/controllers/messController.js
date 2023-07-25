const messModel = require("../model/messSchema");

async function getData(req, res) {
  try {
    const data = await messModel.findOne({ hostel: req.user.hostel });
    res.status(200).json({
      success: true,
      message: {
        data: data,
        user: req.user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

module.exports = {
  getData,
};
