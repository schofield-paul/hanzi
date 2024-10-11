interface TranslationObject {
  character: string;
  pinyin: string;
}

export const fetchData = async (
  text: string,
  targetLanguage: string
): Promise<TranslationObject[] | undefined> => {
  try {
    const response = await fetch("https://hanzi-app.onrender.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, targetLanguage }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    return result as TranslationObject[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch translation. Please try again later.");
  }
};
