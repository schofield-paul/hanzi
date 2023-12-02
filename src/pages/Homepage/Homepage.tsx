import Selections from "../Selection/SelectionPage";
import classNames from "classnames";
import style from "./HomePage.module.css";
import Banner from "../../components/banner/Banner";

export default function Homepage() {
  return (
    <div className={classNames(style.app)}>
      <h1>Hanzi</h1>

      <Banner
        title="The best way to learn Chinese characters"
        subtitle="Learn Chinese characters with ease"
        image="https://images.unsplash.com/photo-1562887108-2e5a3d8e9b7b"
      />
      <Selections />
    </div>
  );
}
