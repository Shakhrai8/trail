const express = require("express");
const initialAPICallsRouter = require("./routes/initialAPICallsRoute");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/", initialAPICallsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
