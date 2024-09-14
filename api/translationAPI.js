const express = require("express");
const app = express();

app.use(express.json());

const { connectToTranslationAPI } = require("./translation.js");

app.get("/foo", async (req, res) => {
  console.log("Hello");
  try {
    translatedText = await connectToTranslationAPI();
    console.log(translatedText);

    res.status(200).json(translatedText);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});
