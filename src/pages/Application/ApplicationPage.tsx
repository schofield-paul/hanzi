// @ts-nocheck
import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/cards/Card";

export default function Application() {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div>
      <h1>Application</h1>
      {data ? (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Card data={data} />
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
