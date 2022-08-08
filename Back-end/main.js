const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require("./modules/users/routes/userRoutes");


const dbConnection = require("./configration/db.config");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(userRoutes);

dbConnection();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
