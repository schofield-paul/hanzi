// @ts-nocheck

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import style from "./SelectionPage.module.css";
import Application from "../Application/ApplicationPage";
import DataContext from "../../DataContext";

export default function Selections() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const { updateData } = useContext(DataContext);

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
        `http://localhost:3000/hanzi?hsk_level=${encodeURIComponent(
          selectedLevel
        )}&hsk_section=${encodeURIComponent(selectedSection)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      console.log("Data fetched:", result);
      updateData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isColored = false;

  return (
    <div className={classNames(style.app)}>
      <h1>Hanzi</h1>
      <div className={classNames(style.contentContainer)}>
        <div>
          <h3>Select Level</h3>
          <div
            className={classNames(style.dropdownContent, {
              [style.color]: isColored,
            })}
          >
            <button
              className="btn"
              style={getLevelStyle(1)}
              onClick={() => handleLevelClick(1)}
              disabled={selectedLevel === 1}
            >
              HSK 1
            </button>
          </div>
        </div>
        <div>
          <h3>Select Section</h3>
          <div className={classNames(style.dropdownContent)}>
            <button
              className="btn"
              style={getSectionStyle("1")}
              onClick={() => handleSectionClick("1")}
              disabled={selectedSection === "1"}
            >
              Section 1
            </button>
          </div>
        </div>
        <Link
          to={`/app?hsk_level=${selectedLevel}&hsk_section=${selectedSection}`}
          className="btn"
        >
          <button
            onClick={fetchData}
            className={classNames(style.startBtn)}
            disabled={!selectedLevel || !selectedSection}
          >
            Start!
          </button>
        </Link>
      </div>
    </div>
  );
}

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
