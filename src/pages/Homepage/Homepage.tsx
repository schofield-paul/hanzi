import Selections from "../Selection/SelectionPage";
import classNames from "classnames";
import style from "./HomePage.module.css";

export default function Homepage() {
  return (
    <div className={classNames(style.app)}>
      <h1>Hanzi</h1>
      <Selections />
    </div>
  );
}
