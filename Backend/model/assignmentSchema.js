const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the title!"],
    trim: true,
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide the due date!"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isStudyMaterial: {
    type: Boolean,
    default: false,
  },
  dateGiven: {
    type: Date,
    default: Date.now,
  },
  dateCompleted: {
    type: Date,
  },
  description: {
    type: String,
    trim: true,
  },
  files: {
    teachers: {
      type: [String],
      default: [],
    },
    students: {
      type: [String],
      default: [],
    },
  },
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the subject name!"],
    trim: true,
  },
  subjectCode: {
    type: String,
    trim: true,
  },
  assignments: {
    type: [assignmentSchema],
  },
});

const announcements = new mongoose.Schema({
  announcer: {
    type: String,
    required: [true, "Please provide the announcer!"],
    trim: true,
  },
  validTill: {
    type: Date,
    required: [true, "Please provide the valid till date!"],
  },
  message: {
    type: String,
    required: [true, "Please provide the message!"],
    trim: true,
  },
  dateTime: {
    type: { date: Date, present: Boolean },
    default: { date: Date.now, present: true },
  },
});
const periodData = new mongoose.Schema({
  period: {
    type: {
      subject: String,
      teacher: String,
    },
  },
});
const dayData = new mongoose.Schema({
  day: {
    type: {
      day: String,
      periods: [periodData],
    },
  },
});
const sectionData = new mongoose.Schema({
  section: {
    type: { section: String, timetable: [dayData] },
  },
});
const sectionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, "Please provide the section!"],
    trim: true,
  },
  subjects: {
    type: [subjectSchema],
  },
  announcements: {
    type: [announcements],
  },
  timeTable: {
    type: [sectionData],
  },
});

const Section = mongoose.model("assignments", sectionSchema);

module.exports = Section;
