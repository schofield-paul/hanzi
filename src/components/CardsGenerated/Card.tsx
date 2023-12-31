import { useState, useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";
import "./card.css";
import { Data } from "./types";
import CardComponent from "../Card";

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
  const isMobile = window.innerWidth < 500;

  useEffect(() => {
    if (characterTargetRef.current) {
      const charactersArray = Array.from(data[currentIndex].character);
      const newWriters = charactersArray.map((character, index) => {
        return HanziWriter.create(characterTargetRef.current!, character, {
          width: isMobile ? 500 : 100,
          height: 100,
          padding: 5,
          showCharacter: false,
          showOutline: false,
          strokeAnimationSpeed: 2,
        });
      });
      newWriters.forEach((writer) => {
        writer.quiz();
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
      <p>{data[currentIndex].pinyin}</p>{" "}
      <div className="pair-container">
        <div className="pair-1">
          <div ref={characterTargetRef} />
        </div>
      </div>
      <button onClick={() => animateCharacter(0)}>Animate</button>
      <button onClick={showNextPair}>Next Pair</button> */
    </>
  );
};

export default Card;

/*
Replace with current component 
    <>
      <CardComponent
        languageEng={data[currentIndex].english}
        languagePin={data[currentIndex].pinyin}
        ref={characterTargetRef}
        clickAnimate={() => animateCharacter(0)}
        clickNext={showNextPair}
      />
*/
