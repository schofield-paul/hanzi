import SelectStageSection from "../../sections/SelectStage/SelectStageSection";
import classNames from "classnames";
import style from "./HomePage.module.css";
import landingImage from "../../assets/landing.jpeg";
import Header from "../../components/Header/Header";

export default function Homepage() {
  return (
    <>
      <Header />
      <div className={style.app}>
        <div className={classNames("hero", style.hero)}>
          <img
            src={landingImage}
            className={classNames(style.landingImage)}
            alt="Landing"
          />
          <h1 className={classNames("title", style.title)}>
            The best way to learn Chinese characters
          </h1>
          <h2 className={classNames("subtitle", style.subtitle)}>
            Become fluent with stroke order practice
          </h2>
        </div>

        <SelectStageSection />
      </div>
    </>
  );
}
