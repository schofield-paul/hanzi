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
      backgroundColor: selectedItems[type] === item ? "yellow" : "lightgray",
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
      setSelectedItems({ ...selectedItems, data: result });
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
          <h3>Select Section</h3>
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
          className="start-btn"
          disabled={!selectedLevel || !selectedSection}
        >
          Start!
        </button>
      </div>
    </div>
  );
}
