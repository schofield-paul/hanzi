const mongoose = require("mongoose");
require("dotenv").config();
const password = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://paulschofield:${password}@hanzi.zyheasm.mongodb.net/?retryWrites=true&w=majority`;

let isConnected = false;

const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectToDB };
