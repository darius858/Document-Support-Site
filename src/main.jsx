import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // dit pad klopt met 'src/App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
