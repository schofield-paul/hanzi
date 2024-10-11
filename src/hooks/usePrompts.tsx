import { useState, useCallback } from "react";
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

        setPrompts((prevPrompts) => [...prevPrompts, prompt]);
      } catch (error) {
        console.error("Failed to post prompt:", error);
      }
    },
    [token]
  );

  const deleteAllPrompts = useCallback(async () => {
    if (!token) return;

    try {
      await axios.delete("https://hanzi-app.onrender.com/prompts/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrompts([]);
      await fetchPrompts();
    } catch (error) {
      console.error("Failed to delete all prompts:", error);
      throw error;
    }
  }, [token, fetchPrompts]);

  return { prompts, fetchPrompts, postPrompt, deleteAllPrompts };
}
