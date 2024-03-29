const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const certRoutes = require("./routes/certRoutes");
const app = express();

require("dotenv").config();

// Enable CORS for all routes and origins
app.use(cors());
app.use(express.json()); // For parsing application/json

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/certs", certRoutes);

const bodyParser = require("body-parser"); // Import body-parser
// Increase the maximum header size limit
app.use(bodyParser.json({ limit: "100mb" }));

// Set maximum allowed size for request headers (in bytes)
app.set("maxHttpHeaderSize", 8111912); // Adjust the value as neededv
const port = process.env.PORT || 3000;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
