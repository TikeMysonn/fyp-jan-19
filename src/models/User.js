// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "public"], default: "public" },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 8);
//   next();
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Custom validator function to check username length
function validateUsernameLength(username) {
  return username.length <= 12;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validateUsernameLength,
      "Username must not exceed 12 characters",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"], // Adding validation for minimum password length
    maxlength: [255, "Password must not exceed 255 characters"], // Adding validation for maximum password length
  },
  role: { type: String, enum: ["admin", "public"], default: "public" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

module.exports = mongoose.model("User", userSchema);
