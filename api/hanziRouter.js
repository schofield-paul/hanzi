// hanziRoutes.js
const express = require("express");
const router = express.Router();
const Hanzi = require("./hanziModel.js");
const { connectToDB } = require("./database.js");
const { connectToTranslationAPI } = require("./translationConnection.js");

// Get Hanzi objects array by HSK section and level
router.get("/", async (req, res) => {
  console.log("Hanzi route");

  const { hsk_level, hsk_section } = req.query;

  try {
    await connectToDB();
    await connectToTranslationAPI();

    console.log("connected to DB");

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

module.exports = router;
