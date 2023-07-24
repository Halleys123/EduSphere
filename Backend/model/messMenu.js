const mongoose = require("mongoose");
const messSchema = new mongoose.Schema({
  messMenu: [
    {
      hostel: {
        type: String,
        required: true,
      },
      foodMenu: [
        {
          day: {
            required: true,

            type: String,
          },
          breakfast: {
            veg: [String],
            nonVeg: [String],
            common: [String],
            required: true,
          },
          lunch: {
            veg: [String],
            nonVeg: [String],
            common: [String],
            required: true,
          },
          dinner: {
            veg: [String],
            nonVeg: [String],
            common: [String],
            required: true,
          },
        },
      ],
    },
  ],
});
module.exports = mongoose.model("messMenu", messSchema);
