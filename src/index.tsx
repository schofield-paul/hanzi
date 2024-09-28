// @ts-nocheck

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Layout from "./layout";
import Application from "./pages/Application/ApplicationPage";
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/AboutPage";
import Input from "./pages/Input/Input";
import SelectStageSection from "./sections/SelectStage/SelectStageSection";

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-W86TED8WXD`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-W86TED8WXD");

    // Track pageview on route change
    gtag("config", "G-W86TED8WXD", {
      page_path: location.pathname,
    });
  }, [location]);
};

function App() {
  useGoogleAnalytics();

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
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
          path: "/input",
          element: <Input />,
          errorElement: <div>404 Not Found</div>,
        },
        {
          path: "/about",
          element: <About />,
          errorElement: <div>404 Not Found</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

reportWebVitals();
