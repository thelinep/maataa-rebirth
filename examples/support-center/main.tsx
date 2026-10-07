import React from "react";
import { createRoot } from "react-dom/client";
import { SupportCenter } from "./SupportCenter";
import "./support-center.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><SupportCenter /></React.StrictMode>,
);
