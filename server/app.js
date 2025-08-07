const express = require("express");
const cors = require("cors");
const mailRouters = require("./routes/mailRoutes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/mails", mailRouters)

module.exports = app;
