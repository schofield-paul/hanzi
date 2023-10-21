//@ts-nocheck

import { useState, useEffect } from "react";
import HanziWriter from "hanzi-writer";
import { data } from "../../data";
import "./card.css";

// Imports word, character list and animates using stroke order
export default function Card() {
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
    let writer: HanziWriter;

    // for each

    if (showChinese) {
      writer = data[currentIndex].chinese_character.map((character) => {
        return HanziWriter.create("character-target-div", character, {
          width: 100,
          height: 100,
          padding: 5,
          showOutline: true,
        });
      });

      writer.forEach((writer) => {
        writer.animateCharacter();
      });
    }
  }, [currentIndex, showChinese]);

  return (
    <>
      <div className="pair-1">
        <p>{data[currentIndex].english_word}</p>
        <button onClick={showNextPair}>Next Pair</button>
      </div>
      <div className="pair-2">
        <div id="character-target-div"></div>
        <button onClick={() => setShowChinese(true)}>Animate</button>
      </div>
    </>
  );
}
