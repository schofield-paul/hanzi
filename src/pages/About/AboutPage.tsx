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
          After many attempts to stich together online conversion tools, Anki
          decks, translation sites, and GPT generated content—I realized it was
          time to build the tool I needed.
        </p>
        <p className={style.paragraph}>
          Hanzi is an attempt to simplify the task of learning the writing
          system of chinese characters. It uses SVG animated character in proper
          stroke order using some of the most common words.
        </p>
        <p className={style.paragraph}>
          Beginners can start on HSK 1 and work their way up through HSK 3
          vocabulary.&nbsp; 快乐学习！
        </p>
        <p className={style.paragraph}></p>
        <p className={style.paragraph}></p>
      </div>
    </>
  );
}
