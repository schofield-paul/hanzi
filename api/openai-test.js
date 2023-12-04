const OpenAI = require("openai");

const openai = new OpenAI();

async function main() {
  const chineseCharacter = "书";

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "user", content: chineseCharacter },
      {
        role: "system",
        content:
          "Please explain the usage of this Chinese character in English.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
