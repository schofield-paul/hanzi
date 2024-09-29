import style from "./Input.module.css";
import { useRef, useState, useEffect } from "react";
import { fetchData } from "../../hooks/fetchData"; // Importing from the new api file
import { initializeHanziWriter } from "../../hooks/initializeHanziWriter";

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const writerContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={style.contentContainer}>
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
