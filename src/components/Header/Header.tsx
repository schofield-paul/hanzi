import classNames from "classnames";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={style.app}>
      <Link to="/" className={style.link}>
        <h2 className={style.h1}>Hanzi</h2>
      </Link>
    </div>
  );
}
