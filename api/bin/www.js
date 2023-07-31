const express = require("express");
const mongoose = require("mongoose");
const initialAPICallsRoute = require("../routes/initialAPICallsRoute");
const PlacesRouter = require("../routes/PlacesRoute");
const cors = require("cors");

const mongoDbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/trail";
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request body

app.use("/", initialAPICallsRoute);
app.use("/route", PlacesRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
