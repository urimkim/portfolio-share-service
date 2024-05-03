const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = require("mongoose");

// const id = uuidv4();

const UserSchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
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
}, {
  timestamps: true,
  }
);

const Members = mongoose.model("members", UserSchema);

module.exports = Members;
