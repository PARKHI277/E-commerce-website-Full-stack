const app = require("./app");
const dotenv = require("dotenv");
const connectdatabase = require("./config/database");

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to uncaught exception`);
  process.exit(1);
});
//config

dotenv.config({ path: "backend/config/config.env" });

connectdatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled Promise Rejectiom

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
