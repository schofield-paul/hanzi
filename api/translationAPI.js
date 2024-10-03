// fooRoutes.js
const express = require("express");
const router = express.Router();
const { connectToTranslationAPI } = require("./translationConnection.js");

router.get("/", async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res
      .status(400)
      .json({ error: "Text and target language are required" });
  }

  try {
    const translatedText = await connectToTranslationAPI(text, targetLanguage);
    console.log("Translated Text:", translatedText);

    res.status(200).json(translatedText);
  } catch (err) {
    console.error("Error:", err.message, err.stack);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
