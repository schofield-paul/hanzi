import React from "react";
import style from "./InfoCard.module.css";

export default function InfoCard() {
  return (
    <div className={style.cardWrapper}>
      <div className={style.card}>
        <h3 className={style.cardHeader}>How it works</h3>
        <div className={style.cardBody}>
          <p className={style.text}>
            Start by selecting a vocabulary level from HSK 1 to HSK 3, and cycle
            through characters learning the pinyin and proper sequence.
          </p>
        </div>
      </div>
    </div>
  );
}
