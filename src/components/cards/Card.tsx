//@ts-nocheck

import { useState, useEffect } from "react";
import HanziWriter from "hanzi-writer";
import { data } from "../../data";
import "./card.css";

export default function Card() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [writers, setWriters] = useState([]);

  const showNextPair = () => {
    const characterDiv = document.getElementById("character-target-1");
    if (characterDiv) {
      characterDiv.innerHTML = "";
    }

    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  useEffect(() => {
    // Create writers for the current data item
    const newWriters = data[currentIndex].chinese_character.map((character) => {
      return HanziWriter.create("character-target-1", character, {
        width: 100,
        height: 100,
        padding: 5,
        showCharacter: false,
        showOutline: false,
      });
    });

    setWriters(newWriters);
  }, [currentIndex]);

  const animateCharacter = (index) => {
    const delayBetweenAnimations = 1000;
    const currentWriter = writers[index];

    writers.forEach((writer) => {
      writer.showOutline();
    });

    if (currentWriter) {
      currentWriter.showCharacter();
      currentWriter.showOutline();
      currentWriter.animateCharacter({
        onComplete: function () {
          setTimeout(function () {
            animateCharacter(index + 1); // Start animating the next character
          }, delayBetweenAnimations);
        },
      });
    }
  };

  return (
    <>
      <div className="pair-1">
        <p>{data[currentIndex].english_word}</p>
        <button onClick={showNextPair}>Next Pair</button>
      </div>
      <div className="pair-2">
        <div id="character-target-1"></div>
        <button onClick={() => animateCharacter(0)}>Animate</button>
      </div>
    </>
  );
}
