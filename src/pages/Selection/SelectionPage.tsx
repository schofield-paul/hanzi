// @ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "./SelectionPage.module.css";

export default function Selections() {
  const [selectedItems, setSelectedItems] = useState({
    selectedLevel: null,
    selectedSection: null,
    data: null,
  });
  const { selectedLevel, selectedSection, data } = selectedItems;
  const navigate = useNavigate();

  const handleItemClick = (type, item) => {
    setSelectedItems({ ...selectedItems, [type]: item });
  };

  const getItemStyle = (type, item) => {
    return {
      backgroundColor: selectedItems[type] === item ? "grey" : "lightgray",
    };
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://hanzi-app.com/hanzi?hsk_level=${encodeURIComponent(
          selectedLevel
        )}&hsk_section=${encodeURIComponent(selectedSection)}`
      );
      // Mock API call
      // const response = await fetch("http://localhost:3001/api/hanzi");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      console.log("result", result);
      setSelectedItems({ ...selectedItems, data: result });
      navigate("/app", { state: { data: result } });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isColored = false;

  return (
    <div className={classNames(style.contentContainer)}>
      <div>
        <h3 className={classNames(style.selectPrompts)}>Select Level</h3>
        <div className={classNames(style.dropdownContent)}>
          {[1, 2, 3, 4].map((level) => (
            <button
              key={`level-${level}`}
              className="btn"
              style={getItemStyle("selectedLevel", level)}
              onClick={() => handleItemClick("selectedLevel", level)}
              disabled={selectedLevel === level}
            >
              HSK {level}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className={classNames(style.selectPrompts)}>Select Section</h3>
        <div className={classNames(style.dropdownContent)}>
          {["1", "2", "3", "4"].map((section) => (
            <button
              key={`section-${section}`}
              className="btn"
              style={getItemStyle("selectedSection", section)}
              onClick={() => handleItemClick("selectedSection", section)}
              disabled={selectedSection === section}
            >
              Section {section}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={fetchData}
        className={classNames(style.startButton)}
        disabled={!selectedLevel || !selectedSection}
      >
        Start
      </button>
    </div>
  );
}
