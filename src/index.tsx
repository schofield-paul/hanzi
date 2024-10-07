// @ts-nocheck
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./layout";
import Application from "./pages/Application/ApplicationPage";
import Homepage from "./pages/Homepage/Homepage";
import About from "./pages/About/AboutPage";
import Input from "./pages/Input/Input";
import SelectStageSection from "./sections/SelectStage/SelectStageSection";

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) {
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
      window.gtag = gtag; // Define gtag globally
      gtag("js", new Date());
      gtag("config", "G-W86TED8WXD");
    }

    // Track pageview on route change
    if (window.gtag) {
      window.gtag("config", "G-W86TED8WXD", {
        page_path: location.pathname,
      });
    }
  }, [location]);
};

const App = () => {
  useGoogleAnalytics();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="app" element={<Application />} />
        <Route path="selection" element={<SelectStageSection />} />
        <Route path="input" element={<Input />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="969179813000-f071bo3gnletmrcmmeovaa6lmeif0fdp.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);

reportWebVitals();
