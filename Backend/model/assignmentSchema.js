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

const sectionSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, "Please provide the section!"],
    trim: true,
  },
  subjects: {
    type: [subjectSchema],
  },
});

const Section = mongoose.model("assignments", sectionSchema);

module.exports = Section;
