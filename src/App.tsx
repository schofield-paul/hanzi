import { useState } from "react";
import "./App.css";
import { data } from "./data";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showChinese, setShowChinese] = useState(false);

  const showNextPair = () => {
    setShowChinese((prevShowChinese) => !prevShowChinese);
    if (!showChinese) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  };

  return (
    <div className="App">
      <h1>Hanzi</h1>
      <div className="content-container">
        <header className="App-header">
          <div key={data[currentIndex].id}>
            <p>{data[currentIndex].english_word}</p>
            {/* Display the Chinese character conditionally */}
            <p>{showChinese ? "" : data[currentIndex].chinese_character}</p>
          </div>
          <button onClick={showNextPair}>Next Pair</button>
        </header>
      </div>
    </div>
  );
}

export default App;
