const { Schema } = require('mongoose');

const EducationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    educationId: {
      type: String,
      required: true
    },
    school: {
      type: String,
      required: true
    },
    major: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['재학중', '학사졸업', '석사졸업', '박사졸업'],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = EducationSchema;
