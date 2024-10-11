const express = require("express");
const router = express.Router();
const UserPrompts = require("./userPromptsModel");
const { connectToDB } = require("./database.js");

router.get("/", async (req, res) => {
  try {
    await connectToDB();
    const userPrompts = await UserPrompts.find({ user: req.user.sub });
    res.status(200).json(userPrompts);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
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

router.delete("/all", async (req, res) => {
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

module.exports = router;
