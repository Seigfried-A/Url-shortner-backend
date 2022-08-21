const express = require("express");
const urlRouter = require("./routes/Url");
require("./db/db.config");

const app = express();
app.use(express.json());

app.use(urlRouter);
module.exports = app;
