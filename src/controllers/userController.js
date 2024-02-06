const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Utility function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  if (
    role === "admin" &&
    !process.env.AUTHORIZED_ADMINS.split(",").includes(username)
  ) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized to register as an admin",
    });
  }

  try {
    const user = await User.create({
      username,
      password,
      role: role || "public",
    });
    const token = generateToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      data: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists and password is correct
    const user = await User.findOne({ username }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }

    // If everything is ok, send token to client
    const token = generateToken(user._id);
    // Remove password from the user object before sending it back
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Add a method to the User model to check the entered password against the hashed password
User.prototype.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
