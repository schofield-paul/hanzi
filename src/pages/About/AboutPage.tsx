import SelectStageSection from "../../sections/SelectStage/SelectStageSection";
import classNames from "classnames";
import style from "./AboutPage.module.css";
import landingImage from "../../assets/landing.jpeg";
import Header from "../../components/Header/Header";
import heroImage from "../../assets/hero.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <Header />
      <div className={style.app}>
        <h1 className={style.h1}>About</h1>
        <p className={style.paragraph}>
          After many attempts to stich together online conversion tools, Anki
          decks, translation sites, and GPT generated content—I realized it was
          time to build the tool I needed.
        </p>
        <p className={style.paragraph}>
          Hanzi is an attempt to simplify the task of learning the writing
          system of chinese characters. It uses SVG animated character in proper
          stroke order using some of the most common words.
        </p>
        <p className={style.paragraph}>
          Beginners can start on HSK 1 and work their way up through HSK 3
          vocabulary. Any feedback, suggestions, or feature requests can be
          submitted below.&nbsp; 快乐学习！
        </p>
        <p className={style.paragraph}></p>
        <p className={style.paragraph}></p>
      </div>
    </>
  );
}
