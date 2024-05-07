const { Schema } = require("mongoose");

const AwardSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    awardId: {
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
    versionKey: false,
  },
);

module.exports = { AwardSchema };
