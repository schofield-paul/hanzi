import style from "./Input.module.css";
import { useRef, useState, useEffect } from "react";
import HanziWriter from "hanzi-writer";

// const fetchDataTest = async () => {
//   const response = await fetch("http://localhost:3005/translation");
//   console.log(response);
// };

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const writerContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (text: string, targetLanguage: string) => {
    console.log("fetching data");
    try {
      const response = await fetch(
        "https://hanzi-app.onrender.com/translation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, targetLanguage }),
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   // This will only run when the Input component is mounted
  //   fetchDataTest();
  // }, []);

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

    const targetLanguage = "zh";

    const translation = await fetchData(inputValue, targetLanguage);

    if (translation && writerContainerRef.current) {
      // Clear the container if it has any previous writers
      writerContainerRef.current.innerHTML = "";

      // Iterate over each character in the translation string
      translation.split("").forEach((character: string, index: number) => {
        // Create a unique container for each character
        const charContainer = document.createElement("div");
        charContainer.id = `character-container-${index}`;
        charContainer.classList.add("character-container");
        writerContainerRef.current!.appendChild(charContainer);
        // Create a HanziWriter instance for each character
        var writer = HanziWriter.create(charContainer.id, character, {
          width: 100,
          height: 100,
          padding: 5,
          showOutline: true,
        });
        writer.animateCharacter();
      });
    } else {
      alert("Translation failed or no characters to display.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={style.contentContainer}>
        <h1 className={style.mainText}>Input Mandarin to translate</h1>
        <form onSubmit={handleSubmit}>
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
        <div className={style.character} ref={writerContainerRef} />
      </div>
    </>
  );
}
