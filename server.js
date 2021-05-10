const express = require("express");
const app = express();
const routes = require("./routes/router");
const createError = require('http-errors');
const mongoose = require('mongoose');
const url = require('./config');

app.use(express.urlencoded({ extended: false }));
let gfs;
const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect.once('open', () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads"
    });
});
console.log('connected');
app.use('/', routes());
app.use( express.json());



let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

module.exports = app;