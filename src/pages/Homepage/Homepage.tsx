import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/Header/Header";
import styles from "./HomePage.module.css";
import HanziWriter from "hanzi-writer";

export default function Homepage() {
  const [inputValue, setInputValue] = useState("");
  const characterContainerRef = useRef<HTMLDivElement>(null);

  const animateCharacters = useCallback(() => {
    if (characterContainerRef.current && inputValue) {
      characterContainerRef.current.innerHTML = "";
      const characters = inputValue.split("");

      const animateCharacter = (index: number) => {
        const writer = HanziWriter.create(
          characterContainerRef.current!.appendChild(
            document.createElement("div")
          ),
          characters[index],
          {
            width: 100,
            height: 200,
            padding: 5,
            showOutline: true,
            strokeAnimationSpeed: 2,
          }
        );

        if (writer) {
          writer.showCharacter();
          writer.animateCharacter({
            onComplete: () => {
              if (index < characters.length - 1) {
                animateCharacter(index + 1);
              }
            },
          });
        }
      };

      animateCharacter(0);
    }
  }, [characterContainerRef, inputValue]);

  useEffect(() => {
    if (characterContainerRef.current) {
      characterContainerRef.current.innerHTML = "";
    }
  }, [inputValue]);

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.messageDisplay}>
          <p className={styles.typedText}>Typed text: {inputValue}</p>
          <div
            ref={characterContainerRef}
            className={[styles.characterContainer, styles.flexRow].join(" ")}
          ></div>
        </div>
        <div className={styles.chatInput}>
          <label htmlFor="textInput" className={styles.hiddenLabel}>
            Enter text:
          </label>
          <input
            type="text"
            id="textInput"
            className={styles.textInput}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={animateCharacters}>Animate Characters</button>
        </div>
      </div>
    </>
  );
}
