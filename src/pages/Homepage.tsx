// @ts-nocheck

import React, { useState, useEffect } from "react";
import HanziWriter from "hanzi-writer";
import "./Homepage.css";
import { data } from "../data";

function handleAnimateButtonClick(writer) {
  writer.animateCharacter();
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChinese, setShowChinese] = useState(false);

  const showNextPair = () => {
    if (showChinese) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
    setShowChinese((prevShowChinese) => !prevShowChinese);
  };

  useEffect(() => {
    // HanziWriter initialization
    const writer = HanziWriter.create(
      "character-target-div",
      data[currentIndex].chinese_character,
      {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true,
      }
    );

    // Get the button element and attach event listener
    const animateButton = document.getElementById("animate-button");
    if (animateButton) {
      animateButton.addEventListener("click", () =>
        handleAnimateButtonClick(writer)
      );
    }

    // Cleanup function to remove event listener when component unmounts
    return () => {
      // Remove the event listener
      if (animateButton) {
        animateButton.removeEventListener("click", () =>
          handleAnimateButtonClick(writer)
        );
      }
    };
  }, [currentIndex]);

  return (
    <div className="App">
      <h1>Hanzi</h1>
      <div className="content-container">
        <header className="App-header">
          <div key={data[currentIndex].id}>
            <p>{data[currentIndex].english_word}</p>
            <p>{showChinese ? data[currentIndex].chinese_character : ""}</p>
          </div>
          <button onClick={showNextPair}>Next Pair</button>
          <div id="character-target-div"></div>
          <button id="animate-button">Animate</button>
        </header>
      </div>
    </div>
  );
}

export default App;
