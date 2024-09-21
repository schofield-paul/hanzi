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
  allowedHeaders: "*",
};
app.use(cors(corsOptions));

// Import routes
const hanziRoutes = require("./hanziRouter");
const translationRoutes = require("./translationAPI");

const port = process.env.PORT || 3000;

// Use routes
app.use("/hanzi", hanziRoutes);
app.use("/translation", translationRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
