const express = require("express");
const router = express.Router();
const axios = require("axios");
const { connectToTranslationAPI } = require("../translationConnection.js");

router.post("/", async (req, res) => {
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

module.exports = router;
