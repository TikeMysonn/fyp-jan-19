const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const certRoutes = require("./routes/certRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // For parsing application/json

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/certs", certRoutes);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
