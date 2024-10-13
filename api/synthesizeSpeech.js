const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const path = require("path");
const express = require("express");
const router = express.Router();

const credentialPath = path.join(
  __dirname,
  "..",
  "hanzi-translation-aedd447dba71.json"
);

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: credentialPath,
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
