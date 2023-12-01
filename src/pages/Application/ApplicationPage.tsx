// @ts-nocheck
import React from "react";
import { useContext } from "react";
import { DataContext } from "../../DataContext";

export default function Application() {
  const { data } = useContext(DataContext);

  return (
    <div>
      <h1>Application</h1>
      <div className="fetched-data">
        {/* Display the fetched data */}
        {/* Use the 'data' received from the context */}
        <h2>Fetched Data:</h2>
        {data && data.length > 0 ? (
          <ul>
            {data.map((hanzi, index) => (
              <li key={index}>
                <p>{hanzi.simplified}</p>
                <p>{hanzi.pinyin}</p>
                <p>{hanzi.english}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
