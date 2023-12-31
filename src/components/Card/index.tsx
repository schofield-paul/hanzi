import React from "react";
import internal from "stream";

export interface CardProps {
  languageEng: any;
  languagePin: any;
  ref: any;
  clickAnimate: any;
  showNextPair: () => void;
}

const CardComponent = ({
  languageEng,
  languagePin,
  ref,
  clickAnimate,
  showNextPair,
}: any) => {
  return (
    <div data-testid="card-element">
      {!!languageEng && <p>{languageEng}</p>}
      {!!languagePin && <p>{languagePin}</p>}

      <div className="pair-container">
        <div className="pair-1">{!!ref && <div ref={ref} />}</div>
      </div>
      <button onClick={() => clickAnimate}>Animate</button>
      <button onClick={showNextPair}>Next Pair</button>
    </div>
  );
};

export default CardComponent;
