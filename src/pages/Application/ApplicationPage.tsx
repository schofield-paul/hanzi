// @ts-nocheck
import React from "react";
import { useLocation } from "react-router-dom";

export default function Application() {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div>
      <h1>Application</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : "No data available"}</pre>
    </div>
  );
}
