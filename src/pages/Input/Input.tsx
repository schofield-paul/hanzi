import style from "./Input.module.css";
import { useRef, useState, useEffect } from "react";
import { fetchData } from "../../hooks/fetchData";
import { initializeHanziWriter } from "../../hooks/initializeHanziWriter";
import { GoogleLogin } from "@react-oauth/google";
import { usePrompts } from "../../hooks/usePrompts";
import { useAuth } from "../../hooks/useAuth";
import PromptSideNav from "../../components/PromptSideNav/PromptSideNav";

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const writerContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { user, handleLoginSuccess, handleLogout } = useAuth();
  const token = localStorage.getItem("token");
  const { prompts, postPrompt, fetchPrompts } = usePrompts(token);

  const containsEnglish = (input: string) =>
    /^[a-zA-Z\s.,!?':;()\u2019-]+$/.test(input);

  const handleTranslation = async (text: string) => {
    const targetLanguage = "zh";
    try {
      const translation = await fetchData(text, targetLanguage);
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

  const handlePromptSelect = async (prompt: string) => {
    setInputValue(prompt);
    setIsLoading(true);
    await handleTranslation(prompt);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!containsEnglish(inputValue)) {
      alert("Please enter valid English text.");
      return;
    }

    setIsLoading(true);
    await handleTranslation(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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

  return (
    <div className={style.contentContainer}>
      <PromptSideNav onPromptSelect={handlePromptSelect} prompts={prompts} />
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
            inputValue.trim() ? style.active : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Translating..." : "Translate"}
        </button>
      </form>

      <div className={style.character} ref={writerContainerRef} />
    </div>
  );
}
