import { useState, useEffect } from "react";
import "./App.css";
import { data } from "./data";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChinese, setShowChinese] = useState(false);

  const showNextPair = () => {
    if (showChinese) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
    setShowChinese((prevShowChinese) => !prevShowChinese);
  };

  return (
    <div className="App">
      <h1>Hanzi</h1>
      <div className="content-container">
        <header className="App-header">
          <div key={data[currentIndex].id}>
            <p>{data[currentIndex].english_word}</p>
            <p>{showChinese ? data[currentIndex].chinese_character : ""}</p>
          </div>
          <button onClick={showNextPair}>Next Pair</button>
        </header>
      </div>
    </div>
  );
}

export default App;
