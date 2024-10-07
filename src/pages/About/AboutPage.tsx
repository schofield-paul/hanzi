import style from "./AboutPage.module.css";

export default function About() {
  return (
    <>
      <div className={style.app}>
        <h1 className={style.h1}>Why Hanzi?</h1>
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
        <p className={`${style.paragraph} ${style.centered}`}>快乐学习！</p>
      </div>
    </>
  );
}
