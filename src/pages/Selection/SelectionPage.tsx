import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "./SelectionPage.module.css";

export default function Selections() {
  const [selectedItems, setSelectedItems] = useState({
    selectedLevel: null,
    selectedSection: null,
    data: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { selectedLevel, selectedSection, data } = selectedItems;
  const navigate = useNavigate();

  const handleItemClick = (
    type: keyof typeof selectedItems,
    item: string | number
  ) => {
    setSelectedItems({ ...selectedItems, [type]: item });
  };

  const getItemStyle = (
    type: keyof typeof selectedItems,
    item: string | number
  ) => {
    return {
      backgroundColor: selectedItems[type] === item ? "grey" : "lightgray",
    };
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://hanzi-app.onrender.com/hanzi?hsk_level=${encodeURIComponent(
          selectedLevel || ""
        )}&hsk_section=${encodeURIComponent(selectedSection || "")}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      setSelectedItems({ ...selectedItems, data: result });
      navigate("/app", { state: { data: result } });
      window.scrollTo(0, 0);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isColored = false;

  return (
    <div className={classNames(style.contentContainer)}>
      <div>
        <h3 className={classNames(style.selectPrompts)}>Select HSK Level</h3>
        <div className={classNames(style.dropdownContent)}>
          {[1, 2, 3].map((level) => (
            <button
              key={`level-${level}`}
              className={classNames(style.btn)}
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
          {["1", "2", "3"].map((section) => (
            <button
              key={`section-${section}`}
              className={classNames(style.btn)}
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
        disabled={!selectedLevel}
      >
        {isLoading ? "Loading..." : "Start"}
      </button>
    </div>
  );
}
