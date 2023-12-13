import Selections from "../Selection/SelectionPage";
import classNames from "classnames";
import style from "./HomePage.module.css";
import landingImage from "../../assets/landing.jpeg";

export default function Homepage() {
  return (
    <div className={classNames(style.app)}>
      <h1>Hanzi</h1>
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

      <Selections />
    </div>
  );
}
