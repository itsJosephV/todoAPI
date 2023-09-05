const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require('./connectMongo')

// console.log(process.env.PORT)

// we using port 8000

const port = process.env.PORT || 8000;

const todoRoutes = require("./routes/Todo");

const app = express();

// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON
app.use(bodyParser.json());
app.use("/api", todoRoutes);

connectDB()

//DB Connection
// mongoose.connect("mongodb://127.0.0.1/todoapp").then(() => {
//   console.log("CONNECTED TO DB");
// });

app.get("/", (_, res) => {
  res.send("Main page");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
