const { Schema } = require('mongoose');

const certificateSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    certificateId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = certificateSchema;
