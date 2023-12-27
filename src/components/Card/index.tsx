import React from "react";
import internal from "stream";

export interface CardProps {
  languageEng: any;
  languagePin: any;
  ref: any;
  clicAnimate: any;
  showNextPair: () => void;
}

const Card = ({
  languageEng,
  languagePin,
  ref,
  clicAnimate,
  showNextPair,
}: any) => {
  return (
    <>
      {!!languageEng && <p>{languageEng}</p>}
      {!!languagePin && <p>{languagePin}</p>}

      <div className="pair-container">
        <div className="pair-1">{!!ref && <div ref={ref} />}</div>
      </div>
      <button onClick={() => clicAnimate}>Animate</button>
      <button onClick={showNextPair}>Next Pair</button>
    </>
  );
};

export default Card;
