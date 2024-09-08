// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Application from "./pages/Application/ApplicationPage";
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/AboutPage";
import SelectStageSection from "./sections/SelectStage/SelectStageSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/app",
    element: <Application />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/selection",
    element: <SelectStageSection />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <div>404 Not Found</div>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
