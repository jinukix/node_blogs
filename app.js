const express = require("express");
const routes = require("./routes");
const logger = require("morgan")("dev");

const app = express();

app.use(express.json());
app.use(logger);
app.use(routes);

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  console.log(err);
  res.status(statusCode).json({ message });
});

module.exports = app;
