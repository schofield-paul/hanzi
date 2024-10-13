import { useState } from "react";
import styles from "./PromptSideNav.module.css";

interface PromptSideNavProps {
  onPromptSelect: (prompt: string) => void;
  prompts: string[];
  onDeleteAllPrompts: () => Promise<void>;
  isLoggedIn: boolean;
}

export default function PromptSideNav({
  onPromptSelect,
  prompts,
  onDeleteAllPrompts,
  isLoggedIn,
}: PromptSideNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    try {
      await onDeleteAllPrompts();
    } catch (error) {
      console.error("Failed to delete all prompts:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div
        className={`${styles.container} ${isVisible ? styles.showSidebar : ""}`}
      >
        <div className={styles.headerContainer}>
          <h2>Recent Prompts</h2>
          <button
            onClick={handleDeleteAll}
            className={styles.deleteAllButton}
            disabled={isDeleting || prompts.length === 0}
          >
            {isDeleting ? "Clearing..." : "Clear"}
          </button>
        </div>
        {prompts.length > 0 ? (
          <ul>
            {[...prompts].reverse().map((prompt, index) => (
              <li key={index} onClick={() => onPromptSelect(prompt)}>
                {prompt}
              </li>
            ))}
          </ul>
        ) : isLoggedIn ? (
          <p className={styles.noPromptsMessage}>No prompts saved</p>
        ) : (
          <p className={styles.loginMessage}>Login to save prompts</p>
        )}
      </div>
    </>
  );
}
