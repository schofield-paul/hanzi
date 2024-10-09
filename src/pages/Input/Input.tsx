import style from "./Input.module.css";
import { useRef, useState, useEffect } from "react";
import { fetchData } from "../../hooks/fetchData";
import { initializeHanziWriter } from "../../hooks/initializeHanziWriter";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [prompts, setPrompts] = useState<string[]>([]);
  const writerContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLoginSuccess = async (response: { credential: string }) => {
    const token = response.credential;
    try {
      const decoded = jwtDecode(token);
      setUser(decoded as any);
      localStorage.setItem("token", token);
      await fetchPrompts(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setPrompts([]);
    localStorage.removeItem("token");
  };

  const fetchPrompts = async (token: string) => {
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
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        "https://hanzi-app.onrender.com/prompts",
        { prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchPrompts(token);
    } catch (error) {
      console.error("Failed to post prompt:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded as any);
        fetchPrompts(token);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const containsEnglish = (input: string) =>
    /^[a-zA-Z\s.,!?':;()\u2019-]+$/.test(input);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!containsEnglish(inputValue)) {
      alert("Please enter valid English text.");
      return;
    }

    const targetLanguage = "zh";
    setIsLoading(true);

    try {
      const translation = await fetchData(inputValue, targetLanguage);
      if (translation && writerContainerRef.current) {
        initializeHanziWriter(writerContainerRef.current, translation);
        if (user) {
          await postPrompt(inputValue);
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

  return (
    <div className={style.contentContainer}>
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

      {user && prompts.length > 0 && (
        <div className={style.promptsContainer}>
          <h2>Your Prompts:</h2>
          <ul>
            {prompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
