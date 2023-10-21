import React, { useState, useEffect } from "react";
import HanziWriter from "hanzi-writer";
import "./Homepage.css";
import { data } from "../data";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChinese, setShowChinese] = useState(false);

  const showNextPair = () => {
    const characterDiv = document.getElementById("character-target-div");
    if (characterDiv) {
      characterDiv.innerHTML = "";
    }

    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setShowChinese(false);
  };

  useEffect(() => {
    let writer: HanziWriter | null = null;

    if (showChinese) {
      writer = HanziWriter.create(
        "character-target-div",
        data[currentIndex].chinese_character,
        {
          width: 100,
          height: 100,
          padding: 5,
          showOutline: true,
        }
      );

      writer.animateCharacter();
    }
  }, [currentIndex, showChinese]);

  return (
    <div className="App">
      <h1>Hanzi</h1>
      <div className="content-container">
        <header className="App-header">
          <div className="pair-1" key={data[currentIndex].id}>
            <p>{data[currentIndex].english_word}</p>
            <button onClick={showNextPair}>Next Pair</button>
          </div>
          <div className="pair-2">
            <div id="character-target-div"></div>
            <button onClick={() => setShowChinese(true)}>Animate</button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
