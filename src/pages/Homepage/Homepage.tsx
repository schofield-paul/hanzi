import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Quote from "../../components/Quote/Quote";
import CarouselCard from "../../components/CarouselCard/CarouselCard";
import About from "../About/AboutPage";
import { cardData, cardData2, cardData3 } from "../../data/cardData";
import style from "./HomePage.module.css";

export default function Homepage() {
  const navigate = useNavigate();

  function renderCarousel(data: typeof cardData, containerClass: string) {
    return (
      <div className={style.carouselWrapper}>
        <div className={containerClass}>
          {data.map((card, index) => (
            <Link
              to="/input"
              state={{ cardContent: card.content }}
              key={index}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <CarouselCard title={card.title} content={card.content} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const repeatedCardData = Array(30).fill(cardData).flat();
  const repeatedCardData2 = Array(30).fill(cardData2).flat();
  const repeatedCardData3 = Array(30).fill(cardData3).flat();

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    document
      .querySelector('meta[name="viewport"]')
      ?.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      );
    navigate("/input");
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <button
              className={style.button}
              onClick={handleGetStarted}
              style={{ touchAction: "manipulation" }}
            >
              Get Started
            </button>
            <button className={style.learnMore} onClick={handleLearnMore}>
              <span>Learn More</span>{" "}
              <ChevronRightIcon className={style.iconAdjust} />
            </button>
          </div>
          {renderCarousel(repeatedCardData, style.carouselContainer)}
          {renderCarousel(repeatedCardData2, style.carouselContainerReverse)}
          {renderCarousel(repeatedCardData3, style.carouselContainer)}
        </div>
      </div>
      <div id="about-section">
        <About />
      </div>
      <Quote />
    </>
  );
}
