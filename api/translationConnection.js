const projectId = "hanzi-translation";
require("dotenv").config();

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_TRANSLATE_API_KEY;

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

const preprocessTranslation = (translation) => {
  // Regular expression to match Chinese characters (Mandarin)
  return translation.replace(/[^\u4E00-\u9FFF]+/g, ""); // Keeps only Mandarin characters
};

// Instantiates a client using the API key
const translate = new Translate({ key: GOOGLE_APPLICATION_CREDENTIALS });

const connectToTranslationAPI = async (text, target) => {
  console.log("connectToTranslationAPI runnning");

  try {
    const [translation] = await translate.translate(text, target);
    const cleanedTranslation = preprocessTranslation(translation);

    return cleanedTranslation;
  } catch (error) {
    console.error("Error in translation:", error.message);
    throw new Error(
      "Failed to translate text. Check your API key and configuration."
    );
  }
};

module.exports = { connectToTranslationAPI };
