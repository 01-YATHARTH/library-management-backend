const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config(); // load environment variables

connectDB(); // connect to MongoDB

const app = express();

app.use(express.json()); // middleware to read JSON

// routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api", bookRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Library Management API Running");
});

// error middleware (must be before listen)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});