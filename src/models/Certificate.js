// const mongoose = require("mongoose");

// const certificateSchema = new mongoose.Schema({
//   certType: String,
//   courseName: String,
//   grade: String,
//   uniName: String,
//   studentName: String,
//   studentId: { type: String, unique: true },
//   issueYear: Number,
// });

// module.exports = mongoose.model("Certificate", certificateSchema);

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certType: { type: String, minlength: 1, maxlength: 255 }, // Adjusted to accept input between 1 to 255 characters
  courseName: { type: String, minlength: 1, maxlength: 255 }, // Adjusted to accept input between 1 to 255 characters
  grade: { type: String, minlength: 1, maxlength: 255 }, // Adjusted to accept input between 1 to 255 characters
  uniName: { type: String, minlength: 1, maxlength: 255 }, // Adjusted to accept input between 1 to 255 characters
  studentName: { type: String, minlength: 1, maxlength: 255 }, // Adjusted to accept input between 1 to 255 characters
  studentId: { type: String, unique: true },
  issueYear: {
    type: Number,
    minlength: 4,
    maxlength: 4,
    validate: {
      validator: function (v) {
        return /^\d{4}$/.test(v); // Regular expression to validate exactly 4 digits
      },
      message: (props) => `${props.value} is not a valid 4-digit year!`,
    },
  },
});

module.exports = mongoose.model("Certificate", certificateSchema);
