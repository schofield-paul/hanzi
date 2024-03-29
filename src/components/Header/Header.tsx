import classNames from "classnames";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className={style.app}>
      <div className={style.headerContainer}>
        <Link to="/" className={style.link}>
          <h2 className={style.h1}>Hanzi</h2>
        </Link>
        <Link to="/selection" className={style.link}>
          <h2 className={style.h2}>Words</h2>
        </Link>
        {/*<h2 className={style.h2}>Input </h2>*/}
        {/*<h2 className={style.h2}>Sentences</h2>*/}
      </div>
      <div className={style.buttonContainer}>
        {/* <button className={style.button}>Sign In</button> */}
        {/*<button className={style.button}>Sign Up</button>*/}
      </div>
    </div>
  );
}
