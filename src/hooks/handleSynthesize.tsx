export const handleSynthesize = async (
  translatedText: string
): Promise<void> => {
  if (translatedText) {
    try {
      const response = await fetch(
        "https://hanzi-app.onrender.com/synthesize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: translatedText }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBlob = await response.blob();

      if (audioBlob.size === 0) {
        throw new Error("Received empty audio blob");
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
      };

      audio.oncanplaythrough = async () => {
        try {
          await audio.play();
        } catch (playError) {
          console.error("Error playing audio:", playError);
        }
      };

      audio.load();
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  } else {
    console.log("No translated text to synthesize");
  }
};
