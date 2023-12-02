import React from "react";
import classNames from "classnames";
import style from "./banner.module.css";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, image }) => {
  return (
    <div className={classNames("hero", style.hero)}>
      <h1 className={classNames("title", style.title)}>{title}</h1>
      <h2 className={classNames("subtitle", style.subtitle)}>{subtitle}</h2>
    </div>
  );
};
export default Hero;
