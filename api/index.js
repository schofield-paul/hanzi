const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  origin: [
    "https://www.hanzi-app.com",
    "https://www.hanzi-app.com/",
    "http://192.168.1.95:3000",
    "http://localhost:3005/",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

const { connectToDB } = require("./database.js");
const { connectToTranslationAPI } = require("./translation.js");

// Import routes
const hanziRoutes = require("./hanziRoute");
const fooRoutes = require("./translationAPI");

const port = process.env.PORT || 3000;

// Use routes
app.use("/hanzi", hanziRoutes);
app.use("/foo", fooRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
