import React, { useState } from "react";
import classNames from "classnames";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={style.app}>
      <div className={style.headerContainer1}>
        <Link to="/" className={style.link}>
          <h2 className={style.h1}>Hanzi</h2>
        </Link>
        <div className={style.menuContainer}>
          <div className={style.hamburger} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`${style.navLinks} ${isMenuOpen ? style.open : ""}`}>
            <Link to="/input" className={style.link} onClick={toggleMenu}>
              <h2 className={style.h2}>Translate</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
