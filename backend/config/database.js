const mongoose = require("mongoose");

const connectdatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/Ecommerce", {
      useNewUrlParser: true,
      //   useUnifiedTopoloyg: true,
      //   userCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server : ${data.connection.host}`);
    });
};

module.exports = connectdatabase;
