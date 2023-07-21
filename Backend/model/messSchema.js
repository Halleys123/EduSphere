const mongoose = require("mongoose");
const item = new mongoose.Schema({
  time: String,
  type: String,
  menu: [String],
});
const menuDay = new mongoose.Schema({
  day: {
    day: String,
    menu: [item],
  },
});
const snackDay = new mongoose.Schema({
  day: String,
  item: [String],
});
const rateItem = new mongoose.Schema({
  rating: {
    overall: Number,
    taste: Number,
    quality: Number,
    quantity: Number,
    hygiene: Number,
  },
});
const starCounts = new mongoose.Schema({
  star: Number,
});
const ratingItem = new mongoose.Schema({
  date: Date,
  rating: { breakfast: rateItem, starCount: [starCounts] },
});
const messSchema = new mongoose.Schema({
  hostel: {
    type: String,
    required: [true, "Please provide your hostel!"],
    trim: true,
  },
  mess: {
    timings: {
      type: String,
    },
    menu: [menuDay],
    snacks: [snackDay],
    rating: [ratingItem],
  },
});

const hostel = mongoose.model("hostels", messSchema);

module.exports = hostel;
