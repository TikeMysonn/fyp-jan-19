const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

// Use the authMiddleware to protect routes that require authentication
router.use(authMiddleware.protect);

// Other protected routes here

module.exports = router;
