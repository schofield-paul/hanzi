// @ts-nocheck
import React from "react";

export default function Application({ renderFetchedData }) {
  return (
    <div>
      <h1>Application</h1>
      {renderFetchedData()}
    </div>
  );
}
