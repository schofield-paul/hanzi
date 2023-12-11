import { useState, useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";
import "./card.css";
import { Data } from "./types";

interface CardProps {
  data: Data[];
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [writers, setWriters] = useState<HanziWriter[]>([]);
  const characterTargetRef = useRef<HTMLDivElement | null>(null);

  const showNextPair = () => {
    if (characterTargetRef.current) {
      characterTargetRef.current.innerHTML = "";
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  useEffect(() => {
    if (characterTargetRef.current) {
      const charactersArray = Array.from(data[currentIndex].character);
      const newWriters = charactersArray.map((character, index) => {
        return HanziWriter.create(characterTargetRef.current!, character, {
          width: 100,
          height: 100,
          padding: 5,
          showCharacter: false,
          showOutline: false,
          strokeAnimationSpeed: 2,
        });
      });
      setWriters(newWriters);
    }
  }, [currentIndex, data]);

  const animateCharacter = (index: number) => {
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
      <p>{data[currentIndex].english}</p>
      <p>{data[currentIndex].pinyin}</p>

      <div className="pair-container">
        <div className="pair-1">
          <div ref={characterTargetRef}></div>
        </div>
      </div>
      <button onClick={() => animateCharacter(0)}>Animate</button>
      <button onClick={showNextPair}>Next Pair</button>
    </>
  );
};

export default Card;
