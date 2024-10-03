const projectId = "hanzi-translation";
require("dotenv").config();

const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_TRANSLATE_API_KEY;

const { Translate } = require("@google-cloud/translate").v2;

const preprocessTranslation = (translation) => {
  // Keeps only Mandarin characters
  return translation.replace(/[^\u4E00-\u9FFF]+/g, "");
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
