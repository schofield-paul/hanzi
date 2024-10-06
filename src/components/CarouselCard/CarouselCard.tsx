import style from "./CarouselCard.module.css";

function CarouselCard({ title, content }: { title: string; content: string }) {
  return (
    <div className={style.carouselCard}>
      <p className={style.cardBody}>{content}</p>
    </div>
  );
}

export default CarouselCard;
