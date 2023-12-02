// @ts-nocheck
import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/cards/Card";
import classNames from "classnames";
import style from "./ApplicationPage.module.css";

export default function Application() {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div>
      <h1 className={classNames(style.h1)}>App</h1>
      {data ? (
        <>
          <Card data={data} />
          <h3>Raw Data</h3>

          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
