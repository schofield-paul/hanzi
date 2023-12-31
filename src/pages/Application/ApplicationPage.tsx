// @ts-nocheck
import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/card/Card";
import classNames from "classnames";
import style from "./ApplicationPage.module.css";

export default function Application() {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className={classNames(style.contentContainer)}>
      <h1 className={classNames(style.h1)}>App</h1>

      <Card data={data} />
    </div>
  );
}
