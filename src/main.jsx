import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./site/App.jsx"; // dit pad klopt met 'src/site/App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
