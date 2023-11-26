// @ts-nocheck

import { useState } from "react";
import "./Selections.css";
import Card from "../../components/cards/Card";

function Selections() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [data, setData] = useState({});

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const getLevelStyle = (level) => {
    return {
      backgroundColor: selectedLevel === level ? "yellow" : "lightgray",
    };
  };

  const getSectionStyle = (section) => {
    return {
      backgroundColor: selectedSection === section ? "yellow" : "lightgray",
    };
  };

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const response = await fetch(
        `http://localhost:3000/hanzi/${parseInt(selectedLevel)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      console.log("Data fetched:", result);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Hanzi</h1>
      <div className="content-container">
        <div>
          <h3>Select Level</h3>
          <div className="dropdown-content">
            <button
              className="btn"
              style={getLevelStyle(1)}
              onClick={() => handleLevelClick(1)}
              disabled={selectedLevel === 1}
            >
              HSK 1
            </button>
            <button
              className="btn"
              style={getLevelStyle(2)}
              onClick={() => handleLevelClick(2)}
              disabled={selectedLevel === 2}
            >
              HSK 2
            </button>
          </div>
        </div>
        <div>
          <h3>Select Section</h3>
          <div className="dropdown-content">
            <button
              className="btn"
              style={getSectionStyle("1")}
              onClick={() => handleSectionClick("1")}
              disabled={selectedSection === "1"}
            >
              Section 1
            </button>
            <button
              className="btn"
              style={getSectionStyle("2")}
              onClick={() => handleSectionClick("2")}
              disabled={selectedSection === "2"}
            >
              Section 2
            </button>
          </div>
        </div>
        <button
          onClick={fetchData}
          className="start-btn"
          disabled={!selectedLevel || !selectedSection}
        >
          Start!
        </button>
        {data && (
          <div className="fetched-data">
            <h2>Fetched Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {/* Display the fetched data here as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Selections;

/*
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
*/
