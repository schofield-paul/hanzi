//@ts-nocheck

import { useState, useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";
import "./card.css";

const Card = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [writers, setWriters] = useState([]);
  const characterTargetRef = useRef(null);

  const showNextPair = () => {
    if (characterTargetRef.current) {
      characterTargetRef.current.innerHTML = "";
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  useEffect(() => {
    if (characterTargetRef.current) {
      const charactersArray = Array.from(data[currentIndex].character); // Split the string into an array of characters
      const newWriters = charactersArray.map((character, index) => {
        return HanziWriter.create(characterTargetRef.current, character, {
          width: 100,
          height: 100,
          padding: 5,
          showCharacter: false,
          showOutline: false,
        });
      });
      setWriters(newWriters);
    }
  }, [currentIndex, data]);

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
        onComplete: () => {
          setTimeout(() => {
            animateCharacter(index + 1);
          }, delayBetweenAnimations);
        },
      });
    }
  };

  return (
    <>
      <div className="pair-1">
        <p>{data[currentIndex].english}</p>
        <button onClick={showNextPair}>Next Pair</button>
      </div>
      <div className="pair-2">
        <div ref={characterTargetRef}></div>
        <button onClick={() => animateCharacter(0)}>Animate</button>
      </div>
    </>
  );
};

export default Card;
