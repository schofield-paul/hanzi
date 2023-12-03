const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env.development.local" });
const password = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://paulschofield:${password}@hanzi.zyheasm.mongodb.net/?retryWrites=true&w=majority`;

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "Hanzi",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDB };
