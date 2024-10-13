import { useRef, useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";
import { usePrompts } from "../../hooks/usePrompts";
import { fetchData } from "../../hooks/fetchData";
import { initializeHanziWriter } from "../../hooks/initializeHanziWriter";
import { isValidEnglishInput } from "../../utils/inputValidation";
import PromptSideNav from "../../components/PromptSideNav/PromptSideNav";
import style from "./Input.module.css";

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translatedText, setTranslatedText] = useState<string>("");

  const writerContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { user, handleLoginSuccess, handleLogout } = useAuth();
  const token = localStorage.getItem("token");
  const { prompts, postPrompt, fetchPrompts, deleteAllPrompts } =
    usePrompts(token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (token) {
      fetchPrompts();
    }
  }, [token, fetchPrompts]);

  const handlePromptSelect = async (prompt: string) => {
    setInputValue(prompt);
    setIsLoading(true);
    await handleTranslation(prompt);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEnglishInput(inputValue)) {
      setIsLoading(true);
      await handleTranslation(inputValue);
    } else {
      console.log("Please enter English text only");
    }
  };

  const handleSynthesize = async () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTranslation = async (text: string) => {
    const targetLanguage = "zh";
    try {
      const translation = await fetchData(text, targetLanguage);
      setTranslatedText(
        translation ? translation.map((t) => t.character).join("") : ""
      );
      if (translation && writerContainerRef.current) {
        initializeHanziWriter(writerContainerRef.current, translation);
        if (user) {
          await postPrompt(text);
        }
      } else {
        alert("Translation failed or no characters to display.");
      }
    } catch (error: unknown) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAllPrompts = async () => {
    try {
      await deleteAllPrompts();
    } catch (error) {
      console.error("Error deleting all prompts:", error);
    }
  };

  return (
    <div className={style.contentContainer}>
      <PromptSideNav
        isLoggedIn={!!user}
        onPromptSelect={handlePromptSelect}
        prompts={prompts}
        onDeleteAllPrompts={handleDeleteAllPrompts}
      />
      <div className={style.loginContainer}>
        {user ? (
          <div className={style.userInfo}>
            <span>Welcome, {(user as any).name || "User"}!</span>
            <button className={style.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse: any) => {
              if (credentialResponse.credential) {
                handleLoginSuccess({
                  credential: credentialResponse.credential,
                });
              }
            }}
            theme="filled_black"
            shape="pill"
            size="medium"
            text="signin"
          />
        )}
      </div>

      <h1 className={style.mainText}>Input Text to Translate</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={style.form}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter English text"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`${style.submitButton} ${
            isValidEnglishInput(inputValue) ? style.active : ""
          }`}
          disabled={isLoading || !isValidEnglishInput(inputValue)}
        >
          {isLoading ? "Translating..." : "Translate"}
        </button>
        <button
          type="button"
          onClick={handleSynthesize}
          className={style.synthesizeButton}
          disabled={!translatedText}
        >
          Synthesize
        </button>
      </form>
      <div className={style.character} ref={writerContainerRef} />
    </div>
  );
}
