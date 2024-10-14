const textToSpeech = require("@google-cloud/text-to-speech");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const router = express.Router();

console.log("GOOGLE_CLIENT_EMAIL: ", process.env.GOOGLE_CLIENT_EMAIL);
console.log("GOOGLE_PROJECT_ID: ", process.env.GOOGLE_PROJECT_ID);
console.log(
  "GOOGLE_PRIVATE_KEY length: ",
  process.env.GOOGLE_PRIVATE_KEY
    ? process.env.GOOGLE_PRIVATE_KEY.length
    : "No key provided"
);

const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: privateKey,
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

router.post("/", async (req, res) => {
  try {
    const { text, languageCode = "cmn-CN", ssmlGender = "NEUTRAL" } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text input is required" });
    }

    const request = {
      input: { text: text },
      voice: { languageCode, ssmlGender },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);

    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (error) {
    console.error("Speech synthesis error:", error);
    res.status(500).json({ error: "Failed to synthesize speech" });
  }
});

module.exports = router;
