const mongoose = require("mongoose");
const item = new mongoose.Schema({
  time: String,
  type: String,
  menu: [String],
});
const menuDay = new mongoose.Schema({
  day: String,
  menu: [item],
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
const updateItem = new mongoose.Schema({
  item: String,
  message: String,
  date: Date,
});
const messSchema = new mongoose.Schema({
  hostel: {
    type: String,
    required: [true, "Please provide your hostel!"],
    trim: true,
  },
  mess: {
    timings: {
      breakfast: String,
      lunch: String,
      dinner: String,
    },
    menu: [menuDay],
    snacks: [snackDay],
    rating: [ratingItem],
    updates: [updateItem],
  },
  complaints: [
    {
      heading: { type: String },
      datePosted: { type: Date },
      resolved: { type: Boolean, default: false },
    },
  ],
  notices: [
    {
      head: { type: String },
      description: { type: String },
      file: { type: String },
    },
  ],
  events: [
    {
      heading: { type: String },
      date: {
        on: { type: Date },
        posted: { type: Date },
      },
    },
  ],
});

const hostel = mongoose.model("hostels", messSchema);

module.exports = hostel;
