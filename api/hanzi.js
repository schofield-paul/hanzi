const { Schema, model, models } = require("mongoose");

const HanziSchema = new Schema({
  character: {
    type: String,
    required: [true, "Character is required!"],
  },
  pinyin: {
    type: String,
    required: [true, "Pinyin is required!"],
  },
  english: {
    type: String,
    required: [true, "English translation is required!"],
  },
  hsk_level: {
    type: String,
    required: [true, "HSK level is required!"],
  },
  hsk_section: {
    type: String,
    required: [true, "HSK section is required!"],
  },
});

const hanzi = models.Hanzi || model("Hanzi", HanziSchema);

module.exports = hanzi;
