import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Quote from "../../components/Quote/Quote";
import CarouselCard from "../../components/CarouselCard/CarouselCard";
import About from "../About/AboutPage";
import { cardData, cardData2, cardData3 } from "../../data/cardData";
import style from "./HomePage.module.css";

export default function Homepage() {
  function renderCarousel(data: typeof cardData, containerClass: string) {
    return (
      <div className={style.carouselWrapper}>
        <div className={containerClass}>
          {data.map((card, index) => (
            <CarouselCard
              key={index}
              title={card.title}
              content={card.content}
            />
          ))}
        </div>
      </div>
    );
  }

  const repeatedCardData = Array(30).fill(cardData).flat();
  const repeatedCardData2 = Array(30).fill(cardData2).flat();
  const repeatedCardData3 = Array(30).fill(cardData3).flat();

  return (
    <>
      <div className={style.wrapper}>
        <p className={style.logoReflection}>Generated characters</p>
        <p className={style.preText}>Hanzi App</p>
        <div className={style.app}>
          <h1 className={classNames(style.title)}>
            Learn Chinese. See progress.
            <br />
            <span className={style.centerText}>Achieve fluency.</span>
          </h1>
          <h2 className={classNames("subtitle", style.subtitle)}>
            Simple to start. Fun to learn. Dive into Chinese characters and
            fluency with interactive animations and words.
          </h2>
          <div className={style.buttons}>
            <Link to="/input" onClick={() => window.scrollTo(0, 0)}>
              <button className={style.button}>Get Started</button>
            </Link>
            <Link to="/about">
              <button className={style.learnMore}>
                <span>Learn More</span>{" "}
                <ChevronRightIcon className={style.iconAdjust} />
              </button>
            </Link>
          </div>
          {renderCarousel(repeatedCardData, style.carouselContainer)}
          {renderCarousel(repeatedCardData2, style.carouselContainerReverse)}
          {renderCarousel(repeatedCardData3, style.carouselContainer)}
        </div>
        <About />
        <Quote />
      </div>
    </>
  );
}
