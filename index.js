const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// we using port 8000

const port = 8000;

const todoRoutes = require("./routes/Todo");

const app = express();

// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON
app.use(bodyParser.json());


//DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/todoapp").then(() => {
  console.log("CONNECTED TO DB");

  // include the todoRoutes
  app.use("/api", todoRoutes);
  // start the server in the port 8000
  app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
  });
});