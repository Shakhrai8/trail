const express = require("express");
const initialAPICallsRoute = require("../routes/initialAPICallsRoute");
const SpeechRoute = require("../routes/SpeechRoute");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: [
      "https://trailapp.net",
      "https://www.trailapp.net",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON request body

app.use("/", initialAPICallsRoute);
app.use("/speech", SpeechRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
