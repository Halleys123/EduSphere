const mongoose = require("mongoose");
const emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("emailList", emailSchema);
