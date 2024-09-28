import classNames from "classnames";
import style from "./HomePage.module.css";
import heroImage from "../../assets/hero.png";
import Quote from "../../components/Quote/Quote";
import InfoCard from "../../components/InfoCards/InfoCard";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.app}>
          <h1 className={classNames("title", style.title)}>
            <span className={classNames("gradient-text", style.gradientText)}>
              {" "}
              Learn Chinese characters with ease
            </span>
          </h1>
          <h2 className={classNames("subtitle", style.subtitle)}>
            Hanzi is a tool for learning Chinese characters through stroke order
            writing
          </h2>
          <Link to="/input">
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
        <Quote />
        <InfoCard />
      </div>
    </>
  );
}
