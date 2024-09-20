import style from "./Input.module.css";
import { useRef, useState, useEffect } from "react";
import HanziWriter from "hanzi-writer";
import useFetchData from "../../hooks/useFetchLevel";

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const writerContainerRef = useRef<HTMLDivElement | null>(null);

  // Function to detect if input contains English characters
  const containsEnglish = (input: string) => {
    const englishRegex = /^[a-zA-Z\s]+$/; // Regular expression for English letters and spaces
    return englishRegex.test(input);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: call the translation API
    // TODO: check that the input is Mandarin; maybe prevent non-Mandarin input?
    // (Also, maybe support both English -> Mandarin and Mandarin -> English?)
    e.preventDefault();

    if (!containsEnglish(inputValue)) {
      alert("Please enter valid English text.");
      return;
    }

    const targetLanguage = "zh"; // Example: English to Mandarin, set dynamically as needed

    await fetchData(inputValue, targetLanguage);

    if (writerContainerRef.current) {
      var writer = HanziWriter.create(writerContainerRef.current, "国", {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true,
      });
      writer.animateCharacter();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchData = async (text: string, targetLanguage: string) => {
    try {
      const response = await fetch("http://localhost:3005/foo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, targetLanguage }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className={style.contentContainer}>
        <h1 className={style.mainText}>Input Mandarin to translate</h1>
        <form
        //onSubmit={handleSubmit}
        >
          <input
            className="form"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Mandarin"
          />
          <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>
            Translate
          </button>
        </form>
        <div className="character" ref={writerContainerRef} />
      </div>
    </>
  );
}
