import style from "./Input.module.css";
import { useRef, useState, useEffect } from "react";
import HanziWriter from "hanzi-writer";

export default function Input() {
  const [inputValue, setInputValue] = useState<string>("");
  const writerContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: call the translation API
    // TODO: check that the input is Mandarin; maybe prevent non-Mandarin input?
    // (Also, maybe support both English -> Mandarin and Mandarin -> English?)
    if (writerContainerRef.current) {
      console.log(writerContainerRef.current);
      var writer = HanziWriter.create(writerContainerRef.current, "国", {
        width: 100,
        height: 100,
        padding: 5,
        showOutline: true,
      });
      writer.animateCharacter();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={style.contentContainer}>
        <h1 className={style.mainText}>Input Mandarin to translate</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={style.form}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Mandarin"
          />
          <button type="submit" style={{ marginLeft: "10px", padding: "10px" }}>
            Translate
          </button>
        </form>
        <div className={style.character} ref={writerContainerRef} />
      </div>
    </>
  );
}
