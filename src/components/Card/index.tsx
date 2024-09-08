import React from "react";
import internal from "stream";
import "../CardsGenerated/card.css";

export interface CardProps {
  character: string;
  pinyin: string;
  english: string;
  hsk_level: string;
  hsk_section: string;
  ref: any;
  clickAnimate: any;
  showNextPair: () => void;
}

const CardComponent = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      character,
      pinyin,
      english,
      hsk_level,
      hsk_section,
      clickAnimate,
      showNextPair,
    },
    characterRef
  ) => {
    return (
      <div data-testid="card-element">
        {!!english && <p>{english}</p>}
        {!!pinyin && <p>{pinyin}</p>}

        <div className="pair-container">
          <div className="pair-1">
            <div ref={characterRef} />
          </div>
        </div>
        <div className="button-wrapper">
          <button onClick={clickAnimate}>Animate</button>
          <button onClick={showNextPair}>Next Pair</button>
        </div>
      </div>
    );
  }
);

export default CardComponent;
