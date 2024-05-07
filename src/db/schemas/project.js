const { Schema } = require("mongoose");

const ProSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { ProSchema };
