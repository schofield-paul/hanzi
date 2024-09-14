// fooRoutes.js
const express = require("express");
const router = express.Router();
const { connectToTranslationAPI } = require("./translation.js");

router.get("/", async (req, res) => {
  console.log("Hello");
  try {
    const translatedText = await connectToTranslationAPI();
    console.log(translatedText);

    res.status(200).json(translatedText);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
