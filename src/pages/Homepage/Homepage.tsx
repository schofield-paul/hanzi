import Selections from "../Selection/SelectionPage";
import classNames from "classnames";
import style from "./HomePage.module.css";

export default function Homepage() {
  return (
    <div className={classNames(style.app)}>
      <h1>Hanzi</h1>
      <div className={classNames("hero", style.hero)}>
        <h1 className={classNames("title", style.title)}>
          The best way to learn Chinese characters
        </h1>
        <h2 className={classNames("subtitle", style.subtitle)}>
          Learn Chinese characters with ease
        </h2>
      </div>

      <Selections />
    </div>
  );
}
