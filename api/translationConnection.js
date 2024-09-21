const projectId = "hanzi-translation";
require("dotenv").config();

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_TRANSLATE_API_KEY;

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Instantiates a client using the API key
const translate = new Translate({ key: GOOGLE_APPLICATION_CREDENTIALS });

const connectToTranslationAPI = async (text, target) => {
  console.log("connectToTranslationAPI runnning");
  try {
    // The text to translate
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);

    return translation;
  } catch (error) {
    console.error("Error in translation:", error.message);
    throw new Error(
      "Failed to translate text. Check your API key and configuration."
    );
  }
};

module.exports = { connectToTranslationAPI };
