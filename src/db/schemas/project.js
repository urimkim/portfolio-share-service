const { Schema } = require('mongoose');

const projectSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    projectId: {
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

module.exports = projectSchema;
