import classNames from "classnames";
import style from "./HomePage.module.css";
import Quote from "../../components/Quote/Quote";
import InfoCard from "../../components/InfoCards/InfoCard";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <div className={style.wrapper}>
        <p className={style.logoReflection}>Generated characters</p>
        <p className={style.preText}>Hanzi App</p>
        <div className={style.app}>
          <h1 className={classNames(style.title)}>
            Learn Chinese. See progress.
            <br />
            <span className={style.centerText}>Achieve fluency.</span>
          </h1>
          <h2 className={classNames("subtitle", style.subtitle)}>
            Simple to start. Fun to learn. Dive into Chinese characters
            <br />
            and fluency with interactive animations and words.
          </h2>
          <div className={style.buttons}>
            <Link to="/input">
              <button className={style.button}>Get Started</button>
            </Link>
            <Link to="/about">
              <button className={style.learnMore}>Learn More →</button>
            </Link>
          </div>
        </div>
        <Quote />
        <InfoCard />
      </div>
    </>
  );
}
