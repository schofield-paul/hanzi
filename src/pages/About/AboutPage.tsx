import style from "./AboutPage.module.css";
import { useEffect } from "react";

const fetchDataTest = async () => {
  const response = await fetch("http://localhost:3005/hanzi");
  console.log(response);
};

export default function About() {
  // useEffect(() => {
  //   // This will only run when the Input component is mounted
  //   fetchDataTest();
  // }, []);

  return (
    <>
      <div className={style.app}>
        <h1 className={style.h1}>About</h1>
        <p className={style.paragraph}>
          After attempts to stich together Anki decks, conversion tools, and
          online translation sites—I realized it was time to build the tool I
          needed.
        </p>
        <p className={style.paragraph}>
          Hanzi is an attempt to simplify the task of learning the Chinese
          writing system. The unique feature of this website (and the writing
          system), is the relevance of stroke order. Hanzi uses SVG character
          animation in proper stroke order backed by cutting edge translation.
        </p>
        <p className={style.paragraph}>
          Beginners can start on HSK 1 and work their way up through HSK 3
          vocabulary or input English text directly.&nbsp; 快乐学习！
        </p>
        <p className={style.paragraph}></p>
        <p className={style.paragraph}></p>
      </div>
    </>
  );
}
