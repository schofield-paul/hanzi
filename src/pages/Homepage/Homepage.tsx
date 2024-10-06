import classNames from "classnames";
import style from "./HomePage.module.css";
import Quote from "../../components/Quote/Quote";
import { Link } from "react-router-dom";
import CarouselCard from "../../components/CarouselCard/CarouselCard";

const cardData = [
  {
    title: "Card 1",
    content: "Where are the best local cuisines?",
  },
  {
    title: "Card 2",
    content: "Hello, my name is",
  },
  {
    title: "Card 3",
    content:
      "This dish looks amazing! Can you tell me what ingredients are in it?",
  },
  {
    title: "Card 4",
    content: "Nice to meet you. Where is the best tourist attraction?",
  },
  {
    title: "Card 5",
    content: "What do you do for work?",
  },
  {
    title: "Card 6",
    content: "Do you speak English?",
  },
  {
    title: "Card 7",
    content: "How are you? ",
  },
  {
    title: "Card 8",
    content: "How do I get to the subway station?",
  },
];

const cardData2 = [
  {
    title: "Card 9",
    content: "What is the weather like today?",
  },
  {
    title: "Card 10",
    content: "What time is it?",
  },
  {
    title: "Card 11",
    content: "What is the capital of China?",
  },
  {
    title: "Card 12",
    content: "What’s the most popular dish here?",
  },
  {
    title: "Card 13",
    content: "How far is it from here?",
  },
  {
    title: "Card 14",
    content: "How much does this cost?",
  },
  {
    title: "Card 15",
    content: "Can you tell me about this place’s history?",
  },
  {
    title: "Card 16",
    content: "What is the best time to visit?",
  },
];

const cardData3 = [
  {
    title: "Card 17",
    content: "When is the next train?",
  },
  {
    title: "Card 18",
    content: "Do you have any recommendations for local music or shows? ",
  },
  {
    title: "Card 19",
    content: "Do you have any hobbies? ",
  },
  {
    title: "Card 20",
    content: "Do you watch TV shows? ",
  },
  {
    title: "Card 21",
    content: "I'm primarily studying simplified characters. ",
  },
  {
    title: "Card 22",
    content: "Where is the nearest bookstore.",
  },
  {
    title: "Card 23",
    content: "What do you think of this place? ",
  },
  {
    title: "Card 24",
    content: "That’s an interesting idea! ",
  },
];

export default function Homepage() {
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
            <Link to="/input">
              <button className={style.button}>Get Started</button>
            </Link>
            <Link to="/about">
              <button className={style.learnMore}>Learn More →</button>
            </Link>
          </div>
          <div className={style.carouselWrapper}>
            <div className={style.carouselContainer}>
              {repeatedCardData.map((card, index) => (
                <CarouselCard
                  key={index}
                  title={card.title}
                  content={card.content}
                />
              ))}
            </div>
          </div>
          <div className={style.carouselWrapper}>
            <div className={style.carouselContainerReverse}>
              {repeatedCardData2.map((card, index) => (
                <CarouselCard
                  key={index}
                  title={card.title}
                  content={card.content}
                />
              ))}
            </div>
          </div>
          <div className={style.carouselWrapper}>
            <div className={style.carouselContainer}>
              {repeatedCardData3.map((card, index) => (
                <CarouselCard
                  key={index}
                  title={card.title}
                  content={card.content}
                />
              ))}
            </div>
          </div>
        </div>
        <Quote />
      </div>
    </>
  );
}
