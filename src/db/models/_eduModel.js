const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const EducationSchema = new Schema({
  id: {
    type: String,
    default: () => crypto.randomUUID(),
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    default: "설명이 없습니다. 추가해 주세요",
  },
}, {
  timestamps: true,
  }
);

const Education = mongoose.model("Education", EducationSchema);

module.exports = Education;
