import classNames from "classnames";
import style from "./Quote.module.css";

export default function Quote() {
  return (
    <div>
      <div className={style.quoteWrapper}>
        <div className={style.quoteContent}>
          <p className={style.quoteText}>
            "Language is our most powerful invention. It has allowed us to
            transcend time and space, to store knowledge outside of our brains,
            and to build complex societies."
          </p>
          <p className={style.quoteAuthor}>— Yuval Noah Harari</p>
        </div>
      </div>
    </div>
  );
}
