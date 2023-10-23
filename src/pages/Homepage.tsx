// @ts-nocheck

import { useState } from "react";
import "./Homepage.css";
import Card from "../components/cards/Card";

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (value) => {
    setSelectedValue(value);
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
            <div onClick={() => handleItemClick("Option 1")}>Option 1</div>
            <div onClick={() => handleItemClick("Option 2")}>Option 2</div>
            <div onClick={() => handleItemClick("Option 3")}>Option 3</div>
          </div>
        )}
        {selectedValue && <p>You selected: {selectedValue}</p>}
        <Card />
      </div>
    </div>
  );
}

export default App;
