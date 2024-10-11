const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");

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

const { connectToDB } = require("./database.js");
const { connectToTranslationAPI } = require("./translationConnection.js");
const UserPrompts = require("./userPromptsModel");

const port = process.env.PORT || 3005;

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.decode(token);
    req.user = { sub: decoded.sub };
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

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

app.get("/prompts", validateToken, async (req, res) => {
  try {
    await connectToDB();
    const userPrompts = await UserPrompts.find({ user: req.user.sub });
    res.status(200).json(userPrompts);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/prompts", validateToken, async (req, res) => {
  const { prompt } = req.body;

  try {
    await connectToDB();
    const newPrompt = new UserPrompts({ user: req.user.sub, prompt });
    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/prompts/all", validateToken, async (req, res) => {
  try {
    await connectToDB();
    const prompts = await UserPrompts.find({ user: req.user.sub });
    let deletedCount = 0;
    for (const prompt of prompts) {
      await UserPrompts.findByIdAndDelete(prompt._id);
      deletedCount++;
    }
    res.status(200).json({ message: "All prompts deleted", deletedCount });
  } catch (err) {
    console.error("Error deleting prompts:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
