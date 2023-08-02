const express = require("express");
const initialAPICallsRoute = require("../routes/initialAPICallsRoute");
const SpeechRoute = require("../routes/SpeechRoute");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request body

app.use("/", initialAPICallsRoute);
app.use("/speech", SpeechRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
