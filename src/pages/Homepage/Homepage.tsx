import SelectStageSection from "../../sections/SelectStage/SelectStageSection";
import classNames from "classnames";
import style from "./HomePage.module.css";
import landingImage from "../../assets/landing.jpeg";
import Header from "../../components/Header/Header";
import heroImage from "../../assets/hero.png";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <div className={style.app}>
          <h1 className={classNames("title", style.title)}>
            <span className={classNames("gradient-text", style.gradientText)}>
              {" "}
              Learn Chinese characters with ease
            </span>
          </h1>
          <h2 className={classNames("subtitle", style.subtitle)}>
            Hanzi is a tool for learning Chinese through stroke order through
            writing practice
          </h2>
          <Link to="/selection">
            <button className={classNames("button", style.button)}>
              Get Started
            </button>
          </Link>

          <div className={classNames("hero", style.hero)}>
            <img
              src={heroImage}
              className={classNames(style.heroImage)}
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </>
  );
}
