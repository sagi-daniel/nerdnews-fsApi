const express = require("express");
const app = express();

app.use(express.json());

// Use routes
app.use("/", () => console.log("Hi GeekHub"));

module.exports = app;
