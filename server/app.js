const express = require("express");
const mailRouters = require("./routes/mailRoutes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/mail", mailRouters)

module.exports = app;
