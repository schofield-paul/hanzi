// @ts-nocheck

import { useState } from "react";
import "./Homepage.css";
import Card from "../components/cards/Card";

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dataToggle, setDataToggle] = useState(1);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (value) => {
    setDataToggle(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="App">
      <h1>Hanzi</h1>

      <div className="content-container">
        <button className="btn" onClick={toggleDropdown}>
          Select words
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div onClick={() => handleItemClick(1)}>Word list 1</div>
            <div onClick={() => handleItemClick(2)}>Word list 2</div>
            <div onClick={() => handleItemClick(3)}>Word list 3</div>
          </div>
        )}

        <Card setToggle={dataToggle} />
      </div>
    </div>
  );
}

export default App;
