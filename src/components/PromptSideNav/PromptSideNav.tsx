import { useState } from "react";
import styles from "./PromptSideNav.module.css";

interface PromptSideNavProps {
  onPromptSelect: (prompt: string) => void;
  prompts: string[];
}

export default function PromptSideNav({
  onPromptSelect,
  prompts,
}: PromptSideNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        className={`${styles.container} ${isVisible ? styles.showSidebar : ""}`}
      >
        <h2>Recent Prompts</h2>
        <ul>
          {prompts.length > 0 ? (
            <ul>
              {prompts.map((prompt, index) => (
                <li key={index} onClick={() => onPromptSelect(prompt)}>
                  {prompt}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.loginMessage}>Login to save prompts</p>
          )}
        </ul>
      </div>
    </>
  );
}
