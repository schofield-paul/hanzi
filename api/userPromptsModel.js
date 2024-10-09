const mongoose = require("mongoose");

const userPromptsSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserPrompts = mongoose.model("UserPrompts", userPromptsSchema);

module.exports = UserPrompts;
