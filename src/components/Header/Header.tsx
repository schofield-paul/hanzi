import { Link } from "react-router-dom";
import style from "./Header.module.css";

export default function Header() {
  return (
    <div className={style.app}>
      <div className={style.headerContainer1}>
        <Link to="/" className={style.link}>
          <h2 className={style.h1}>Hanzi</h2>
        </Link>
        <Link
          to="/input"
          className={style.link}
          onClick={() => window.scrollTo(0, 0)}
        >
          <h2 className={style.h2}>Translate</h2>
        </Link>
      </div>
    </div>
  );
}
