const messModel = require("../model/messSchema");

async function getData(req, res) {
  console.log(req.params);
  try {
    const data = await messModel.findOne(req.params);
    res.status(200).json({
      status: "success",
      data: data,
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
