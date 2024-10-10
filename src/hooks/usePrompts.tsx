import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export function usePrompts(token: string | null) {
  const [prompts, setPrompts] = useState<string[]>([]);

  const fetchPrompts = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        "https://hanzi-app.onrender.com/prompts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPrompts(response.data.map((item: any) => item.prompt));
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
    }
  }, [token]);

  const postPrompt = useCallback(
    async (prompt: string) => {
      if (!token) return;

      try {
        await axios.post(
          "https://hanzi-app.onrender.com/prompts",
          { prompt },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPrompts((prevPrompts) => {
          const newPrompts = [...prevPrompts, prompt];
          return newPrompts;
        });
      } catch (error) {
        console.error("Failed to post prompt:", error);
      }
    },
    [token]
  );

  return { prompts, fetchPrompts, postPrompt };
}
