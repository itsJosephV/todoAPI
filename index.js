const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require('./connectMongo')

const port = process.env.PORT || 8000;
const todoRoutes = require("./routes/Todo");
const app = express();


app.use(cors());  //* Middleware for cors to allow cross origin resource sharing
app.use(bodyParser.json());  //* middleware to convert our request data into JSON
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
