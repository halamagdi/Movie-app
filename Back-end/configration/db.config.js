const mongoose = require("mongoose");

const dbConnection = () =>
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then((result) => {
      console.log("connection workes");
    })
    .catch((error) => {
      console.log(error);
    });

module.exports = dbConnection;
