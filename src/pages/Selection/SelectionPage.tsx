// @ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "./SelectionPage.module.css";
import Application from "../Application/ApplicationPage";

export default function Selections() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

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
      setData(result);
      navigate("/app", { state: { data: result } });
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
          </div>
        )}
      </div>
    </div>
  );
}
