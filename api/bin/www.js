const express = require("express");
const initialAPICallsRoute = require("../routes/initialAPICallsRoute");
const textToSpeechRoute = require("../routes/textToSpeechRoute");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/", initialAPICallsRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
