const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json());

// route imports
const product = require("./routes/productRoute");

app.use("/api/users", product);

// middleware
app.use(errorMiddleware);

module.exports = app;
