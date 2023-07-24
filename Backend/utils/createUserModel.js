const userSchema = require("../model/userSchema");
const mongoose = require("mongoose");
const userModel = (collectionName) => {
  return mongoose.model(collectionName, userSchema);
};
module.exports = userModel;
