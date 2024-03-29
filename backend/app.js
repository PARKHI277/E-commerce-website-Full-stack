const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route imports
const product = require("./routes/productRoute");
const user = require("./routes/Userroute");
const order = require("./routes/orderRoute");
app.use("/api/users", product);
app.use("/api/users", user);
app.use("/api/users", order);
// middleware
app.use(errorMiddleware);

module.exports = app;
