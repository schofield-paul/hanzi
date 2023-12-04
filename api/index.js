const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  origin: ["https://www.hanzi-app.com", "https://www.hanzi-app.com/"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

const Hanzi = require("./hanzi.js");
const { connectToDB } = require("./database.js");
console.log("Database:", connectToDB);

const port = process.env.PORT || 3000;

// Get all hanzi
app.get("/hanzi", async (req, res) => {
  try {
    await connectToDB();

    const allHanzi = await Hanzi.find({});

    res.status(200).json(allHanzi);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

// Post a hanzi
app.post("/hanzi", async (req, res) => {
  try {
    await connectToDB();

    const { character, pinyin, english, hsk_leve, hsk_section } = req.body;

    // Check if the Hanzi already exists
    const hanziExists = await Hanzi.findOne({ character });

    // If the Hanzi doesn't exist, create a new entry
    if (!hanziExists) {
      const newHanzi = await Hanzi.create({
        character,
        pinyin,
        english,
        hsk_level,
        hsk_section,
      });
      res.status(201).json(newHanzi);
    } else {
      res.status(400).json({ message: "Hanzi already exists" });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
