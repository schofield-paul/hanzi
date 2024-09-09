import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "./SelectionPage.module.css";
import useFetchData from "../../hooks/useFetchLevel";

export default function SelectStageSection() {
  const [selectedItems, setSelectedItems] = useState({
    selectedLevel: null,
    selectedSection: null,
    data: null,
  });

  const { selectedLevel, selectedSection, data } = selectedItems;

  const handleItemClick = (
    type: keyof typeof selectedItems,
    item: string | number
  ) => {
    setSelectedItems({ ...selectedItems, [type]: item });
  };

  const { fetchData, isLoading } = useFetchData({
    selectedLevel,
    selectedSection,
    setSelectedItems,
  });

  return (
    <>
      <div className={style.contentContainer}>
        <div>
          <h3 className={style.selectPrompts}>Select HSK Level</h3>
          <div className={style.dropdownContent}>
            {Array.from(Array(3).keys()).map((level) => (
              <button
                key={`level-${level + 1}`}
                className={classNames(style.btn, {
                  [style.selected]:
                    selectedItems["selectedLevel"] === level + 1,
                  [style.notSelected]:
                    selectedItems["selectedLevel"] !== level + 1,
                })}
                onClick={() => handleItemClick("selectedLevel", level + 1)}
                disabled={selectedLevel === level}
              >
                HSK {level + 1}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className={style.selectPrompts}>Select Section</h3>
          <div className={style.dropdownContent}>
            {["1", "2", "3"].map((section) => (
              <button
                key={`section-${section}`}
                className={classNames(style.btn, {
                  [style.selected]:
                    selectedItems["selectedSection"] === section,
                  [style.notSelected]:
                    selectedItems["selectedSection"] !== section,
                })}
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
          className={style.startButton}
          disabled={!selectedLevel && !selectedSection}
        >
          {isLoading ? "Loading..." : "Start"}
        </button>
      </div>
    </>
  );
}
