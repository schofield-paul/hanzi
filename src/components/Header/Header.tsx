import classNames from "classnames";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={style.app}>
      <div className={style.headerContainer1}>
        <Link to="/" className={style.link}>
          <h2 className={style.h1}>Hanzi</h2>
        </Link>
        <div className={style.navLinks}>
          <Link to="/input" className={style.link}>
            <h2 className={style.h2}>Translate</h2>
          </Link>
          <Link to="/about" className={style.link}>
            <h2 className={style.h2}>About</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
