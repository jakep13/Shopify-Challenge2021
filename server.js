const express = require("express");
const app = express();
const routes = require("./routes/router");
const createError = require('http-errors');

app.use(express.urlencoded({ extended: false }));
app.use('/', routes());
app.use( express.json());



let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

module.exports = app;