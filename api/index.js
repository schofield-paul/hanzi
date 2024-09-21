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
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

const Hanzi = require("./hanziModel.js");
const { connectToDB } = require("./database.js");
const { connectToTranslationAPI } = require("./translationConnection.js");
console.log("Database:", connectToDB);

const port = process.env.PORT || 3005;

// Get Hanzi objects array by HSK section and level
app.get("/hanzi", async (req, res) => {
  const { hsk_level, hsk_section } = req.query;
  try {
    await connectToDB();
    await connectToTranslationAPI();

    const hanziData = await Hanzi.find({
      hsk_level: hsk_level,
      hsk_section: hsk_section,
    });

    res.status(200).json(hanziData);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
