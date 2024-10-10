import { useEffect } from "react";
import style from "./PromptSideNav.module.css";
import { useAuth } from "../../hooks/useAuth";
import { usePrompts } from "../../hooks/usePrompts";

const PromptSideNav = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const { prompts, fetchPrompts, postPrompt } = usePrompts(token);

  useEffect(() => {
    if (token) {
      fetchPrompts();
    }
  }, [token]);

  return (
    <div className={style.container}>
      PromptSideNav
      <h1>PROMPTS</h1>
      {user ? (
        prompts.length > 0 ? (
          <div className={style.promptsContainer}>
            <h2>Your Prompts:</h2>
            <ul>
              {prompts.map((prompt, index) => (
                <li key={index}>{prompt}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No prompts available.</p>
        )
      ) : (
        <p>Please log in to view prompts.</p>
      )}
    </div>
  );
};

export default PromptSideNav;
