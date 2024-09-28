const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(express.json());

const corsOptions = {
  origin: [
    "https://www.hanzi-app.com",
    "https://www.hanzi-app.com/",
    "http://192.168.1.95:3000",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

const Hanzi = require("./hanziModel.js");
const { connectToDB } = require("./database.js");
const { connectToTranslationAPI } = require("./translationConnection.js");

const port = process.env.PORT || 3005;

app.get("/hanzi", async (req, res) => {
  const { hsk_level, hsk_section } = req.query;
  try {
    await connectToDB();

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

app.post("/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res
      .status(400)
      .json({ error: "Text and target language are required" });
  }

  try {
    const translatedText = await connectToTranslationAPI(text, targetLanguage);

    const fastApiResponse = await axios.post(
      "https://pinyin-service.onrender.com/translate-to-pinyin",
      {
        text: translatedText,
        tone_numbers: false,
        spaces: true,
      }
    );

    const pinyinArray = fastApiResponse.data.pinyin.split(" ");

    const result = translatedText.split("").map((char, i) => ({
      character: char,
      pinyin: pinyinArray[i] || "",
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
