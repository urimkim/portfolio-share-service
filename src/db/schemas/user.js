const crypto = require('node:crypto');
const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      required: true
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
      default: '설명이 없습니다. 추가해 주세요'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = userSchema;
