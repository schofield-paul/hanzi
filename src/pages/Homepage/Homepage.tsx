import SelectStageSection from "../../sections/SelectStage/SelectStageSection";
import classNames from "classnames";
import style from "./HomePage.module.css";
import landingImage from "../../assets/landing.jpeg";
import Header from "../../components/Header/Header";
import heroImage from "../../assets/hero.png";

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
            Become fluent with stroke order practice
          </h2>
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

//   <SelectStageSection />
