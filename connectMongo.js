const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT_URI)
    console.log("connected to MongoDB SUCCESS")
  } catch (error) {
    console.log("connection failed" + error)
  }
}

module.exports = connectDB