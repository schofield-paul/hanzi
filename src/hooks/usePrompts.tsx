import { useState } from "react";
import axios from "axios";

export function usePrompts(token: string | null) {
  const [prompts, setPrompts] = useState<string[]>([]);

  const fetchPrompts = async () => {
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
  };

  const postPrompt = async (prompt: string) => {
    if (!token) return;

    try {
      await axios.post(
        "https://hanzi-app.onrender.com/prompts",
        { prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchPrompts();
    } catch (error) {
      console.error("Failed to post prompt:", error);
    }
  };

  return { prompts, fetchPrompts, postPrompt };
}
