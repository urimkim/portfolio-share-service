const mongoose = require("mongoose");
const crypto = require("crypto");
const { Schema } = require("mongoose");

const id = crypto.randomUUID();

const UserSchema = new Schema({
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
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "설명이 없습니다. 추가해 주세요",
  },
  awards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Award" }],
  certificates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],

}, {
  timestamps: true,
  },
);

const Members = mongoose.model("Member", UserSchema);

module.exports = Members;
