const mysql = require("mysql");
const { MYSQL_CRED, PORT } = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = class App {
  app;
  dbConnection = mysql.createConnection(MYSQL_CRED);

  constructor(controllers) {
    this.app = express();
    this.initializeMiddlewares();
    this.initaliseControllers(controllers);
    this.connectToDB();
  }

  connectToDB() {
    this.dbConnection.connect((err) => {
      if (err) {
        console.log("Error connecting to Database: " + err.message);
      } else {
        console.log("Connection Established");
      }
    });
  }
  listen() {
    this.app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  }
  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  initaliseControllers(controllers) {
    if (Array.isArray(controllers)) {
      controllers.forEach((controller) => {
        this.app.use("/", controller.router);
      });
    }
  }
};
