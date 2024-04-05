import classNames from "classnames";
import style from "./Header.module.css";

export default function Header() {
  return (
    <div className={style.app}>
      <h2 className={style.h1}>Hanzi</h2>
    </div>
  );
}
